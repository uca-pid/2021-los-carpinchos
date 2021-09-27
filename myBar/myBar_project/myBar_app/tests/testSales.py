from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from ..models.user import Mb_user as mb_user
from ..models.product import Product as p
from ..models.category import Category as c
from ..models.sale import Sale as s
from ..models.sale_product import Sale_Product as sp

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
        product3 = p(name='coca', price=9, account=user2 , category = category2)
        product3.full_clean()
        product3.save()
        sale1 = s(creation_date='12/12/12', account=user)
        sale1.full_clean()
        sale1.save()
        sale2 = s(creation_date='12/12/12', account=user)
        sale2.full_clean()
        sale2.save()
        sale_product1 = sp( product = product , quantity_of_product = 3 , sale = sale1)
        sale_product1.full_clean()
        sale_product1.save()
        sale_product3 = sp( product=product3, quantity_of_product=4 , sale = sale1)
        sale_product3.full_clean()
        sale_product3.save()
        sale_product2 = sp( product=product2, quantity_of_product=3, sale = sale2)
        sale_product2.full_clean()
        sale_product2.save()



    def test_sale_creation(self):
        sale = s.sales.first()
        self.assertEqual(sale.getSaleId(),1)
        self.assertEqual(sale.getCreationDate(),'12/12/12')

    def test_sale_already_exists(self):
        user = mb_user(name='Sofia', email='sofia@gmail.com',
                       manager='Toto', password='Pass')
        sale1 = s(creation_date='12/12/12', account=user)
        with self.assertRaises(ValidationError):
            sale1.full_clean()
            sale1.save()

    def test_sale_creation_fail(self):
        user = mb_user(name='Sofia', email='sofia@gmail.com',
                       manager='Toto', password='Pass')
        sale1 = s(creation_date='', account=user)
        with self.assertRaises(ValidationError):
            sale1.full_clean()
            sale1.save()

    def test_sale_creation_endPoint(self):
        webClient = self.client
        response = webClient.post(
            '/createSale/1', {'creation_date': '18/06/21','products': [{'productId': 1 , 'amount': 1},{'productId':2, 'amount': 1}]}, format = 'json')
        self.assertEqual(response.status_code, 201)

    def test_get_all_sales(self):
        webClient = self.client
        response = webClient.get('/getAllSales/1')
        #print(response.data)
        self.assertEqual(len(response.data), 2)

    def test_modify_sale_details(self):
        webClient = self.client
        response = webClient.put(
            '/updateSaleData/1', {"creation_date": '08/09/21'}, format="json")
        self.assertEqual(response.status_code, 200)
        sale = s.getAllSales().filter(sale_id=1).first()
        self.assertEqual(sale.creation_date, '08/09/21')

    def test_delete_sale(self):
        webClient = self.client
        response = webClient.delete('/deleteSale/1')
        self.assertEqual(response.status_code, 200)
        sale = s.getAllSales().filter(sale_id=1).first()
        self.assertEqual(sale, None)