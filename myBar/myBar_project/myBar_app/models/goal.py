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
        if 'categoryId' in keys:
            category = Category.getAllCategories().filter(category_id=argsToChange['categoryId'])
            categoryBis = category.first()
            goal_category_to_change = (self.goals_categories.all().filter(category=categoryBis)).first().modifyGoalCategory(argsToChange['categoryIncomeGoal'])
            goal_category_to_change.full_clean()
            goal_category_to_change.save()
        if 'goal_date' in keys :
            goal = Goal.getAllGoals().filter(goal_date=argsToChange['goal_date'])
            if goal.exists():
                return Response(status=status.HTTP_400_BAD_REQUEST)
        for arg in keys:

            setattr(self, arg, argsToChange[arg])
        return self
    @classmethod
    def delete(cls, id):
        goal = cls.goals.filter(goal_id=id)
        if len(goal) == 0:
            raise Exception("..")
        else:
            goal.delete()