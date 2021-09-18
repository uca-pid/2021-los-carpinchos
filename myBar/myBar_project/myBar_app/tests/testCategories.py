from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from ..models.user import Mb_user as mb_user
from ..models.product import Product as p
from ..models.category import Category as c

class TestProducts(APITestCase):
    "this class contains tests to validate the corect functioning of the creation of users"

    class TestProducts(APITestCase):
        "this class contains tests to validate the corect functioning of the creation of users"

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
            category2 = c(category_name='alcohol',static=False,account=user)


    def test_category_was_succesfully_saved(self):
        category = c.categories.first()
        self.assertEquals(category.getCategoryname(),'bebidas')
        self.assertEquals(category.getStatic(),True)


