from django.db import models

from .category import Category
from .user import Mb_user


class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=25)
    price = models.FloatField()
    account = models.ForeignKey(
        Mb_user, on_delete=models.CASCADE, default=None)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, default=None, blank=True, null=True)

    products = models.Manager()

    # getter method
    def getName(self):
        return self.name

    # setter method
    def setName(self, x):
        self.name = x

    # getter method
    def getPrice(self):
        return self.price

    def getCategory(self):
        return self.category

    # setter method
    def setPrice(self, x):
        self.price = x

    # setter method
    def setCategory(self, x):
        self.category = x

    @classmethod
    def getAllProducts(cls):
        return cls.products.filter()

    @classmethod
    def delete(cls, id):
        product = cls.products.filter(product_id=id)
        if len(product) == 0:
            raise Exception("El usuario a eliminar no existe")
        else:
            product.delete()

    def modifyProduct(self, **argsToChange):
        keys = argsToChange.keys()
        for arg in keys:
            setattr(self, arg, argsToChange[arg])
        return self
