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
        Category, on_delete=models.CASCADE, default=None)

    products = models.Manager()

    # getter method
    def getName(self):
        return self.name

    # getter method
    def getPrice(self):
        return self.price


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
