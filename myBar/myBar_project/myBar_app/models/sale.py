from django.db import models

from .user import Mb_user


class Sale(models.Model):
    sale_id = models.AutoField(primary_key=True)
    creation_date = models.CharField(max_length=20)
    account = models.ForeignKey(
        Mb_user, on_delete=models.CASCADE, default=None)

    sales = models.Manager()

    def getSaleId(self):
        return self.sale_id

    # getter method
    def getCreationDate(self):
        return self.creation_date

    @classmethod
    def getAllSales(cls):
        return cls.sales.filter()
    @classmethod
    def delete(cls, id):
        sale = cls.sales.filter(sale_id=id)
        if len(sale) == 0:
            raise Exception("..")
        else:
            sale.delete()

    def modify_Sale(self, **argsToChange):
        keys = argsToChange.keys()
        for arg in keys:
            setattr(self, arg, argsToChange[arg])
        return self
