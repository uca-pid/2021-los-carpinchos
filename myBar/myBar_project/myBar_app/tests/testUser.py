from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from ..models.user import Mb_user as mb_user
from ..models.securityCode import SecurityCode as Sc
from django.core import mail


class TestUser(APITestCase):
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

    def test_user_was_succefully_saved(self):
        user = mb_user.users.first()

        self.assertEqual(user.getName(), 'Sofia')
        self.assertEqual(user.getEmail(), 'sofia@gmail.com')
        self.assertEqual(user.getManager(), 'Toto')

    def test_user_already_exists(self):
        user = mb_user(name='Sofia', email='sofia@gmail.com',
                       manager='Toto', password='Pass')
        with self.assertRaises(ValidationError):
            user.full_clean()
            user.save()

    def test_user_creation_fail(self):
        user = mb_user(name='', email='h@gmail.com',
                       manager='Toto', password='Pass')
        with self.assertRaises(ValidationError):
            user.full_clean()
            user.save()

    def test_user_creation_endPoint(self):
        webClient = self.client
        response = webClient.post(
            '/createAccount', {'name': 'Sofia', 'manager': 'Toto', 'email': 'sofia@gmail.com', 'password': 'Pass'})

        self.assertEqual(response.status_code, 201)

    def test_log_in_succefull(self):
        webClient = self.client
        response = webClient.post(
            '/login', {'email': 'sofia@gmail.com', 'password': 'Pass'})

        self.assertEqual(response.status_code, 200)

    def test_modify_details(self):
        user = mb_user.getAllUsers().filter(account_id=1).first()
        webClient = self.client
        response = webClient.put(
            '/updateAccountData/1', {"password": "Pass4", "manager": "Glenn"}, format="json")
        self.assertEqual(response.status_code, 200)
        user = mb_user.getAllUsers().filter(account_id=1).first()
        self.assertEqual(user.getPassword(), 'Pass4')
        self.assertEqual(user.getManager(), 'Glenn')

    def test_delete_user(self):
        user = mb_user.getAllUsers().filter(account_id=1).first()
        webClient = self.client
        response = webClient.delete('/deleteAccount/1')

        self.assertEqual(response.status_code, 200)

        user = mb_user.getAllUsers().filter(account_id=1).first()

        self.assertEqual(user, None)

    def test_reestablish_password(self):
        user = mb_user.getAllUsers().filter(account_id=1).first()
        webClient = self.client
        response = webClient.post('/requestPasswordReestablishment',
                                  {'email': 'sofia@gmail.com'}, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(Sc.objects.filter()), 1)
        self.assertEqual(len(mail.outbox), 1)

        response = webClient.post('/validateCode', {'email': 'sofia@gmail.com', 'code': Sc.objects.filter().first().security_code},format="json")

        response = webClient.put('/resetPassword', {'email': 'sofia@gmail.com', 'newPassword': 'hola'},format="json")
        self.assertEqual(response.status_code, 200)
        user = mb_user.getAllUsers().filter(account_id=1).first()
        self.assertEqual(user.getPassword(), 'hola')
        self.assertEqual(len(Sc.objects.filter()), 0)
