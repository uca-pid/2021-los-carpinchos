from django.contrib.auth import get_user_model
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
        product = p(name='cafe', price=9, account=user)
        product.full_clean()
        product.save()
        product2 = p(name='coca', price=9, account=user2)
        product2.full_clean()
        product2.save()
        product3 = p(name='coca', price=9, account=user2)
        product3.full_clean()
        product3.save()
        category1 = c(category_name='bebidas',static=True,account=user)
        category1.full_clean()
        category1.save()
        category2 = c(category_name='alcohol',static=False,account=user)


    def test_category_was_succesfully_saved(self):
        category = c.categories.first()
        self.assertEqual(category.getCategoryname(),'bebidas')
        self.assertEqual(category.getStatic(),True)

    def test_category_creation_fail(self):
        user = mb_user(name='Sofia', email='sofia@gmail.com',
                       manager='Toto', password='Pass')
        category = c(category_name='',static=False,account=user)
        with self.assertRaises(ValidationError):
            category.full_clean()
            category.save()

    def test_category_already_exists(self):
        user = mb_user(name='Sofia', email='sofia@gmail.com',
                       manager='Toto', password='Pass')
        category = c(category_name='bebidas', static=True,account=user)
        with self.assertRaises(ValidationError):
            category.full_clean()
            category.save()

