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


    def modifySaleProduct(self, **quantity):
        setattr(self, 'quantity_of_product', quantity)
        return self

    @classmethod
    def getAllSaleProducts(cls):
        return cls.sales_products.filter()