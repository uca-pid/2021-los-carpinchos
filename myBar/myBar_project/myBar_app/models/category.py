from django.db import models

from .user import Mb_user


class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=40)
    static = models.BooleanField()
    account = models.ForeignKey(
        Mb_user, on_delete=models.CASCADE, default=None, blank=True , null=True)

    categories = models.Manager()

    # getter method
    def getCategoryname(self):
        return self.category_name

    # setter method
    def setCategoryName(self, x):
        self.category_name = x

    # getter method
    def getStatic(self):
        return self.static

    # setter method
    def setStatic(self, x):
        self.static = x

    @classmethod
    def getAllCategories(cls):
        return cls.categories.filter()

    @classmethod
    def delete(cls, id):
        category = cls.categories.filter(category_id=id)
        if len(category) == 0:
            raise Exception("La categoria a eliminar no existe")
        else:
            category.delete()

    def modifyCategory(self, **argsToChange):
        keys = argsToChange.keys()
        for arg in keys:
            setattr(self, arg, argsToChange[arg])
        return self
