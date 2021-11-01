from django.db import models
from .category import Category
from .goal import Goal


class Goal_Category(models.Model):

    id_goal_category = models.AutoField(primary_key=True)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, default=None , related_name='goal_categories_cat')
    goal = models.ForeignKey(
        Goal,on_delete=models.CASCADE, default=None , related_name='goals_categories')

    categoryIncomeGoal = models.IntegerField()

    goal_categories = models.Manager()


    @classmethod
    def getAllGoalCategories(cls):
        return cls.goal_categories.filter()

    def modifyGoalCategory(self, categoryIncomeGoal):
        setattr(self, 'categoryIncomeGoal', categoryIncomeGoal)
        return self

    @classmethod
    def delete(cls, id):
        goal_category = cls.goal_categories.filter(id_goal_category =id)
        if len(goal_category) == 0:
            raise Exception("..")
        else:
            goal_category.delete()