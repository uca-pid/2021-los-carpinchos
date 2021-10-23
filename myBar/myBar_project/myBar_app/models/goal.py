from django.db import models
from requests import Response
from rest_framework import status

from .category import Category
from .user import Mb_user



class Goal(models.Model):
    goal_id = models.AutoField(primary_key=True)
    incomeGoal = models.IntegerField()
    goal_date = models.DateField(auto_now_add=False)
    account = models.ForeignKey(
        Mb_user, on_delete=models.CASCADE, default=None)

    goals = models.Manager()

    def get_year(self):
        return self.year

    def get_month(self):
        return self.month

    def getGoalId(self):
        return self.goal_id

    # getter method
    def getIncomeGoal(self):
        return self.incomeGoal

    @classmethod
    def getAllGoals(cls):
        return cls.goals.filter()

    @classmethod
    def delete(cls, id):
        sale = cls.goals.filter(sale_id=id)
        if len(sale) == 0:
            raise Exception("..")
        else:
            sale.delete()

    def modify_Goal(self, **argsToChange):
        keys = argsToChange.keys()
        print("hola")
        if 'categoryId' in keys:
            print("entra a category")
            category = Category.getAllCategories().filter(category_id=argsToChange['categoryId'])
            #print(category)
            categoryBis = category.first()
            print(categoryBis.category_id)
            goal_category_to_change = (self.goals_categories.all().filter(category=categoryBis)).first().modifyGoalCategory(argsToChange['categoryIncomeGoal'])
            #print(goal_category_to_change)
            goal_category_to_change.full_clean()
            goal_category_to_change.save()
            print(goal_category_to_change)
        if 'goal_date' in keys :
            print(argsToChange['goal_date'])
            goal = Goal.getAllGoals().filter(goal_date=argsToChange['goal_date'])
            print(goal.exists())
            if goal.exists():
                print('entra al none')
                return Response(status=status.HTTP_400_BAD_REQUEST)
        for arg in keys:

            setattr(self, arg, argsToChange[arg])
        return self
