from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from .models import Mb_user as mb_user
from .models import Product as p

# Create your tests here.
#global_user = mb_user(name='Sofia', email='sofia@gmail.com', manager='Toto', password= 'Pass')

class TestUser(APITestCase):
    "this class contains tests to validate the corect functioning of the creation of users"

    def setUp(self):
        user = mb_user(name='Sofia', email='sofia@gmail.com', manager='Toto', password= 'Pass')
        user.full_clean()
        user.save()
        product = p(name='cafe', price = 9)
        product.full_clean()
        product.save()

    def test_user_was_succefully_saved(self):
        user = mb_user.users.first()
        self.assertEqual(user.getName(),'Sofia')
        self.assertEqual(user.getEmail(),'sofia@gmail.com')
        self.assertEqual(user.getManager(),'Toto')

    def test_user_already_exists(self):
        user = mb_user(name='Sofia', email='sofia@gmail.com', manager='Toto', password= 'Pass')
        with self.assertRaises(ValidationError):
            user.full_clean()
            user.save()

    def test_user_creation_fail(self):
        user = mb_user(name='', email='h@gmail.com', manager='Toto', password='Pass')
        with self.assertRaises(ValidationError):
            user.full_clean()
            user.save()

    def test_user_creation_endPoint(self):
        webClient = self.client
        response = webClient.post('/user_creation/', {'name':'Sofia', 'manager':'Toto', 'email': 'sofia@gmail.com', 'password': 'Pass'})
        self.assertEqual(response.status_code,201)

    def test_log_in_succefull(self):
        webClient = self.client
        response = webClient.post('/user_log_in/', {'email': 'sofia@gmail.com', 'password': 'Pass'})
        self.assertEqual(response.status_code,200)

    def test_reestablish_password(self):
        user = mb_user.getAllUsers().filter(id=1).first()
        webClient = self.client
        response = webClient.put('/reestablish_password/1', {'password': 'Pass3'})
        self.assertEqual(response.status_code,204)
        user = mb_user.getAllUsers().filter(id=1).first()
        self.assertEqual(user.getPassword(), 'Pass3')

    def test_modify_details(self):
        user = mb_user.getAllUsers().filter(id=1).first()
        webClient = self.client
        response = webClient.put('/reestablish_password/1', {'password': 'Pass3' , 'manager':'Glenn'})
        self.assertEqual(response.status_code,204)
        user = mb_user.getAllUsers().filter(id=1).first()
        self.assertEqual(user.getPassword(), 'Pass3')
        self.assertEqual(user.getManager(), 'Glenn')

    def test_delete_user(self):
        user = mb_user.getAllUsers().filter(id=1).first()
        webClient = self.client
        response = webClient.delete('/delete_user/1')
        self.assertEqual(response.status_code,200)
        user = mb_user.getAllUsers().filter(id=1).first()
        self.assertEqual(user,None)

    def test_product_was_succefully_saved(self):
        product = p.products.first()
        self.assertEqual(product.getName(),'cafe')
        self.assertEqual(product.getPrice(),9)












