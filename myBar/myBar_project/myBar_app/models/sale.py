from django.contrib.postgres.fields import ArrayField
from django.db import models

from .user import Mb_user


class Sale(models.Model):
    sale_id = models.AutoField(primary_key=True)
    creation_date = models.CharField(max_length=20)
    sale_product_array = models.ArrayField(ArrayField(models.CharField(max_length=10, blank=True)))
    account = models.ForeignKey(
        Mb_user, on_delete=models.CASCADE, default=None)