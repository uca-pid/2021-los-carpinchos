from django.db import models

from .product import Product
from .user import Mb_user


class Sale(models.Model):
    sale_id = models.AutoField(primary_key=True)
    creation_date = DateField(input_formats=settings.DATE_INPUT_FORMATS)
    account = models.ForeignKey(
        Mb_user, on_delete=models.CASCADE, default=None)

    sales = models.Manager()

    def get_day(self):
        return self.creation_date.day

    def get_month(self):
        return self.creation_date.month

    def get_year(self):
        return self.creation_date.year

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
        if 'productId' in keys:
            product = Product.getAllProducts().filter(product_id = argsToChange['productId'])
            productBis = product.first()
            sale_product_to_change = (self.sale_products.all().filter(product = productBis)).first().modifySaleProduct(argsToChange['amount'])
        for arg in keys:
            setattr(self, arg, argsToChange[arg])
        return self
