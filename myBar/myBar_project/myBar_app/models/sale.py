from django.db import models

from .user import Mb_user
from .sale_product import Sale_Product


class Sale(models.Model):
    sale_id = models.AutoField(primary_key=True)
    creation_date = models.CharField(max_length=20)
    sale_product_array = models.ForeignKey(
        Sale_Product, on_delete=models.CASCADE, default=None)
    account = models.ForeignKey(
        Mb_user, on_delete=models.CASCADE, default=None)

    sales = models.Manager()

    def getSaleId(self):
        return self.sale_id

    # setter method
    def setSaleId(self, x):
        self.sale_id = x

    # getter method
    def getCreationDate(self):
        return self.creation_date

    # setter method
    def setCreationDate(self, x):
        self.creation_date = x

    # getter method
    def getSaleProductArray(self):
        return self.sale_product_array

    # setter method
    def setSaleProductArray(self, x):
        self.sale_product_array = x

    @classmethod
    def delete(cls, id):
        sale = cls.sales_products.filter(sale_id=id)
        if len(sale) == 0:
            raise Exception("..")
        else:
            sale.delete()

    def modify_Sale(self, **argsToChange):
        keys = argsToChange.keys()
        for arg in keys:
            setattr(self, arg, argsToChange[arg])
        return self
