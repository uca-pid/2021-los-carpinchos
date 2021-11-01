from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from ..models.user import Mb_user as mb_user
from ..models.product import Product as p
from ..models.category import Category as c



class TestProducts(APITestCase):

    def setUp(self):
        user = mb_user(name='Sofia', email='sofia@gmail.com',
                       manager='Toto', password='Pass')
        user.full_clean()
        user.save()
        user2 = mb_user(name='Pepe', email='pepe@gmail.com',
                        manager='Toto', password='Pass')
        user2.full_clean()
        user2.save()
        category1 = c(category_name='bebidas', static=True, account=user)
        category1.full_clean()
        category1.save()
        category2 = c(category_name='alcohol', static=False, account=user)
        category2.full_clean()
        category2.save()
        product = p(name='cafe', price=9, account=user, category=category1)
        product.full_clean()
        product.save()
        product2 = p(name='coca', price=9, account=user2, category=category1)
        product2.full_clean()
        product2.save()
        product3 = p(name='coca', price=9, account=user2, category=category2)
        product3.full_clean()
        product3.save()

    def test_product_was_succefully_saved(self):
        product = p.products.first()
        self.assertEqual(product.getName(), 'cafe')
        self.assertEqual(product.getPrice(), 9)

    def test_product_creation_fail(self):
        user = mb_user(name='Sofia', email='sofia@gmail.com',
                       manager='Toto', password='Pass')
        category1 = c(category_name='bebidas', static=True, account=user)
        product = p(name='', price=9, account=user, category=category1)
        with self.assertRaises(ValidationError):
            product.full_clean()
            product.save()

    def test_product_creation_with_no_mail(self):
        user = mb_user(name='Sofia', email='',
                       manager='Toto', password='Pass')
        category1 = c(category_name='bebidas', static=True, account=user)
        product = p(name='', price=9, account=user, category=category1)
        with self.assertRaises(ValidationError):
            product.full_clean()
            product.save()

    def test_product_already_exists(self):
        user = mb_user(name='Sofia', email='sofia@gmail.com',
                       manager='Toto', password='Pass')
        category1 = c(category_name='bebidas', static=True, account=user)
        product = p(name='cafe', price=9, account=user, category=category1)
        with self.assertRaises(ValidationError):
            product.full_clean()
            product.save()

    def test_get_all_products(self):
        webClient = self.client
        response = webClient.get('/getAllProducts/2')
        self.assertEqual(len(response.data), 2)

    def test_modify_product_details(self):
        webClient = self.client
        response = webClient.put(
            '/updateProductData/1', {"price": 10}, format="json")
        self.assertEqual(response.status_code, 200)
        product = p.getAllProducts().filter(product_id=1).first()
        self.assertEqual(product.price, 10)

    def test_delete_product(self):
        webClient = self.client
        response = webClient.delete('/deleteProduct/1')
        self.assertEqual(response.status_code, 200)
        product = p.getAllProducts().filter(product_id=1).first()
        self.assertEqual(product, None)
