import random
from django.db import models
from .user import Mb_user


class SecurityCode(models.Model):
    id = models.AutoField(primary_key=True)
    security_code = models.IntegerField()
    account = models.ForeignKey(
        Mb_user, on_delete=models.CASCADE, default=None)


    @classmethod
    def create(cls, user):
        return cls(security_code=random.randrange(1000000, 9999999), account=user)

    @classmethod
    def getAllSecurityCodes(cls):
        return cls.objects.filter()

    @classmethod
    def delete(cls, user):
        security_code = cls.objects.filter(account=user)
        security_code.delete()
