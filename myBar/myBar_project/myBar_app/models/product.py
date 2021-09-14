from django.db import models

from .user import Mb_user


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=25)
    price = models.FloatField()
    account = models.ForeignKey(
        Mb_user, on_delete=models.CASCADE, default=None)

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

    # setter method
    def setPrice(self, x):
        self.price = x

    @classmethod
    def getAllProducts(cls):
        return cls.products.filter()

    @classmethod
    def delete(cls, id):
        product = cls.products.filter(id=id)
        if len(product) == 0:
            raise Exception("El usuario a eliminar no existe")
        else:
            product.delete()

    def modifyProduct(self, **argsToChange):
        keys = argsToChange.keys()
        for arg in keys:
            setattr(self, arg, argsToChange[arg][0])
        return self