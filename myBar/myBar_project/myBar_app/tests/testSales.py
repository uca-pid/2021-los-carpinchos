from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from ..models.user import Mb_user as mb_user
from ..models.product import Product as p
from ..models.category import Category as c
from ..models.sale import Sale as s

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
        category2.full_clean()
        category2.save()

        sale_product1 = sp( product = prodcut1 , quantity_of_product = 3)
        sale_product2 = sp( product=prodcut2, quantity_of_product=3)
        sale_product3 = sp( product=prodcut1, quantity_of_product=4)
        sale_product_list = [sale_product1,sale_product2,sale_product3]
        sale1 = s(creation_date='12/12/12', account=user, sale_product_array=sale_product_list)


    def test_sale_creation(self):
        sale = s.sales.first()
        print(sale.sale_product_array)
        #self.assertEqual(sale.getSaleId(),1)
        #self.assertEqual(sale.getCreationDate(),'12/12/12')
