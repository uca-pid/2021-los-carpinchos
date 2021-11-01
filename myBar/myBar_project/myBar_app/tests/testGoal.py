from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from ..models.user import Mb_user as mb_user
from ..models.product import Product as p
from ..models.category import Category as c
from ..models.sale import Sale as s
from ..models.sale_product import Sale_Product as sp, Sale_Product
from ..models.goal import Goal as g
from ..models.goal_category import Goal_Category as gc, Goal_Category
import datetime


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
        date =datetime.date(2021, 10, 6)
        date2 =datetime.date(2021, 8, 6)
        sale1 = s(creation_date=date, account=user)
        sale1.full_clean()
        sale1.save()
        sale2 = s(creation_date=date, account=user)
        sale2.full_clean()
        sale2.save()
        sale3 = s(creation_date = date2 , account=user)
        sale3.full_clean()
        sale3.save()
        sale4 = s(creation_date = date2 , account=user)
        sale4.full_clean()
        sale4.save()
        sale_product1 = sp( product = product , quantity_of_product = 3 , sale = sale1)
        sale_product1.full_clean()
        sale_product1.save()
        sale_product3 = sp( product=product3, quantity_of_product=4 , sale = sale1)
        sale_product3.full_clean()
        sale_product3.save()
        sale_product2 = sp(product=product2, quantity_of_product=3, sale = sale3)
        sale_product2.full_clean()
        sale_product2.save()
        sale_product2 = sp( product=product2, quantity_of_product=3, sale = sale2)
        sale_product2.full_clean()
        sale_product2.save()
        sale_product4 = sp( product=product3, quantity_of_product=4 , sale = sale3)
        sale_product4.full_clean()
        sale_product4.save()
        sale_product5 = sp( product=product2, quantity_of_product=3, sale = sale4)
        sale_product5.full_clean()
        sale_product5.save()

        goal = g(incomeGoal = 10000 , goal_date = date,   account=user)
        goal.full_clean()
        goal.save()
        goal_category = gc( category = category1 , categoryIncomeGoal= 3000 , goal = goal)
        goal_category.full_clean()
        goal_category.save()
        goal_category2 = gc(category = category2 , categoryIncomeGoal = 2000 , goal= goal)
        goal_category2.full_clean()
        goal_category2.save()
        goal2 = g(incomeGoal = 10000 , goal_date = date2,   account=user)
        goal2.full_clean()
        goal2.save()
        goal_category3 = gc(category = category2 , categoryIncomeGoal = 2000 , goal= goal2)
        goal_category3.full_clean()
        goal_category3.save()
        goal_category4 = gc(category = category1 , categoryIncomeGoal = 2000 , goal= goal2)
        goal_category4.full_clean()
        goal_category4.save()
        date3 = datetime.date(2021, 7, 6)
        goal3 = g(incomeGoal = 10000 , goal_date = date3,   account=user)
        goal3.full_clean()
        goal3.save()
        goal_category5 = gc(category = category2 , categoryIncomeGoal = 2000 , goal= goal3)
        goal_category5.full_clean()
        goal_category5.save()
        goal_category6 = gc(category = category1 , categoryIncomeGoal = 2000 , goal= goal3)
        goal_category6.full_clean()
        goal_category6.save()
        date4 = datetime.date(2021, 6, 6)
        goal4 = g(incomeGoal = 10000 , goal_date = date4,   account=user)
        goal4.full_clean()
        goal4.save()
        goal_category7 = gc(category = category2 , categoryIncomeGoal = 2000 , goal= goal4)
        goal_category7.full_clean()
        goal_category7.save()
        goal_category8 = gc(category = category1 , categoryIncomeGoal = 2000 , goal= goal4)
        goal_category8.full_clean()
        goal_category8.save()
        date5 = datetime.date(2021, 11, 8)
        goal5 = g(incomeGoal = 10000 , goal_date = date5,   account=user)
        goal5.full_clean()
        goal5.save()
        goal_category7 = gc(category = category2 , categoryIncomeGoal = 2000 , goal= goal5)
        goal_category7.full_clean()
        goal_category7.save()
        goal_category8 = gc(category = category1 , categoryIncomeGoal = 2000 , goal= goal5)
        goal_category8.full_clean()
        goal_category8.save()


    def test_create_goal_enpoint(self):
        webClient = self.client
        response = webClient.post(
            '/createGoal/1', {'month' : 10 , 'year' : 2021 , 'incomeGoal': 10000 ,'categories': [{'categoryId': 1 , 'categoryIncomeGoal': 3000},{'categoryId':2, 'categoryIncomeGoal': 2000}]}, format = 'json')
        self.assertEqual(response.status_code, 201)

    def test_goal_creation_fail_with_no_goal_date(self):
        user = mb_user(name='toto', email='h@gmail.com',
                       manager='Toto', password='Pass')
        goal = g(incomeGoal = 10000 , goal_date = '',   account=user)
        with self.assertRaises(ValidationError):
            goal.full_clean()
            goal.save()

    def test_goal_creation_fail_with_no_incomeGoal(self):
        user = mb_user(name='toto', email='h@gmail.com',
                       manager='Toto', password='Pass')
        date5 = datetime.date(2021, 11, 8)
        goal = g(incomeGoal = '' , goal_date = date5, account=user)
        with self.assertRaises(ValidationError):
            goal.full_clean()
            goal.save()

    def test_get_current_goal(self):
        webClient = self.client
        response = webClient.get(
            '/getCurrentGoal/1', )
        self.assertEqual(response.status_code, 200)

    def test_get_all_goals(self):
        webClient = self.client
        response = webClient.get(
            '/getAllGoals/1', )
        self.assertEqual(response.status_code, 200)

    def test_modify_goal(self):
        webClient = self.client
        date =datetime.date(2021, 12, 8)
        response = webClient.put(
            '/updateGoalData/5', {"goal_date":date , "incomeGoal": 11000, 'categoryIncomeGoal':4000 , 'categoryId': 1}, format="json")
        self.assertEqual(response.status_code, 200)
        goal = g.getAllGoals().filter(goal_id=5).first()
        self.assertEqual(goal.incomeGoal, 11000)
        category = c.getAllCategories().filter(category_id = 1)
        categoryBis = category.first()
        goal_category_to_change = Goal_Category.getAllGoalCategories().filter(category = categoryBis).filter(goal = goal).first()
        self.assertEqual(goal_category_to_change.categoryIncomeGoal,4000)

    def test_delete_goal(self):
        webClient = self.client
        response = webClient.delete('/deleteGoal/1')
        self.assertEqual(response.status_code, 200)
        goal = g.getAllGoals().filter(goal_id=1).first()
        self.assertEqual(goal, None)

    def test_delete_goal_category(self):
        webClient = self.client
        response = webClient.delete('/deleteGoalCategory/1')
        self.assertEqual(response.status_code, 200)
        goal_category = gc.getAllGoalCategories().filter(id_goal_category=1).first()
        self.assertEqual(goal_category, None)


