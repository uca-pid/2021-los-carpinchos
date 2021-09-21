from django.db import models
from .user import Mb_user
from .product import Product
from .sale import Sale

class Sale_Product(models.Model):

    id_sale_product = models.AutoField(primary_key=True)
    product = models.ForeignKey(
        Product , on_delete=models.CASCADE, default=None)
    sale = models.ForeignKey(
        Sale,on_delete=models.CASCADE, default=None , related_name='sale_products')
    quantity_of_product = models.IntegerField()

    sales_products = models.Manager()

    # getter method


    # getter method
    def getQuantity_of_product(self):
        return self.quantity_of_product

    # setter method
    def setQuantity_of_product(self, x):
        self.quantity_of_product = x

    @classmethod
    def delete(cls, id):
        sale_product = cls.sales_products.filter(sale_product_id=id)
        if len(sale_product) == 0:
            raise Exception("..")
        else:
            sale_product.delete()

    def modifySale_Product(self, **argsToChange):
        keys = argsToChange.keys()
        for arg in keys:
            setattr(self, arg, argsToChange[arg])
        return self
