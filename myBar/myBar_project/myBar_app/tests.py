from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.test import TestCase, Client
from .models import Mb_user as mb_user

# Create your tests here.

class TestUser(TestCase):
    "this class contains tests to validate the corect functioning of the creation of users"

    def setUp(self):
        user = mb_user(name='Sofia', email='sofia@gmail.com', manager='Toto', password= 'Pass')
        user.full_clean()
        user.save()

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
        webClient = Client()
        response = webClient.post('/user_creation/', {'name':'Sofia', 'manager':'Toto', 'email': 'sofia@gmail.com', 'password': 'Pass'})
        self.assertEqual(response.status_code,201)
        #self.assertTrue(len(response.data.get('code')) == 6)




