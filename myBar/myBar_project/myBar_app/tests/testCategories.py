
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
        category1 = c(category_name='bebidas',static=True,account=user)
        category1.full_clean()
        category1.save()
        category2 = c(category_name='alcohol',static=False,account=user)
        category2.full_clean()
        category2.save()
        product = p(name='cafe', price=9, account=user, category= category1)
        product.full_clean()
        product.save()
        product2 = p(name='coca', price=9, account=user2 , category = category2)
        product2.full_clean()
        product2.save()
        product3 = p(name='coca', price=9, account=user2, category = category2)
        product3.full_clean()
        product3.save()



    def test_category_was_succesfully_saved(self):
        category = c.categories.first()
        self.assertEqual(category.getCategoryname(),'bebidas')
        self.assertEqual(category.getStatic(),True)

    def test_category_creation_endPoint(self):
        webClient = self.client
        response = webClient.post(
            '/createCategory/1', {'name': 'Queso' , 'static': False})

        self.assertEqual(response.status_code, 201)

    def test_category_creation_fail(self):
        user = mb_user(name='Sofia', email='sofia@gmail.com',
                       manager='Toto', password='Pass')
        category = c(category_name='',static=False,account=user)
        with self.assertRaises(ValidationError):
            category.full_clean()
            category.save()
    def test_category_creation_fail_with_no_accout(self):
        user = mb_user(name='Sofia', email='sofia@gmail.com',
                       manager='Toto', password='Pass')
        category = c(category_name='helado',static='hola', account = user)
        with self.assertRaises(ValidationError):
            category.full_clean()
            category.save()

    def test_category_already_exists(self):
        user = mb_user(name='Sofia', email='sofia@gmail.com',
                       manager='Toto', password='Pass')

        category = c(category_name='bebidas', static=True,account=user)
        with self.assertRaises(ValueError):
            category.full_clean()
            category.save()

    def test_get_all_static_categories(self):
        webClient = self.client
        response = webClient.get('/getAllStaticCategories')
        self.assertEqual(len(response.data), 1)

    def test_modify_category_details(self):
        webClient = self.client
        response = webClient.put(
            '/updateCategoryData/2', {"category_name": 'gaseosas'},format="json")
        self.assertEqual(response.status_code,200)
        category = c.getAllCategories().filter(category_id=2).first()
        self.assertEqual(category.getCategoryname(),'gaseosas')

    def test_modify_static_category_details_throws_exception(self):
        webClient = self.client
        response = webClient.put(
            '/updateCategoryData/1', {"category_name": 'gaseosas'}, format="json")
        self.assertEqual(response.status_code,403)
        category = c.getAllCategories().filter(category_id=1).first()
        self.assertEqual(category.getCategoryname(), 'bebidas')

    def test_get_all_non_static_categories(self):
        webClient = self.client
        response = webClient.get('/getAllNonStaticCategories/1')
        self.assertEqual(len(response.data), 1)

    def test_delete_non_static_category(self):
        webClient = self.client
        response = webClient.delete('/deleteCategory/2')
        self.assertEqual(response.status_code,200)
        category = c.getAllCategories().filter(category_id=2).first()
        self.assertEqual(category, None)

    def test_delete_static_category_throws_exception(self):
        webClient = self.client
        response = webClient.delete('/deleteCategory/1')
        self.assertEqual(response.status_code,403)
        category = c.getAllCategories().filter(category_id=1).first()
        self.assertEqual(category.getCategoryname(), 'bebidas')



