import random

from django.db import models

from .user import Mb_user


class SecurityCode(models.Model):
    id = models.AutoField(primary_key=True)
    security_code = models.IntegerField()
    account = models.ForeignKey(
        Mb_user, on_delete=models.CASCADE, default=None)

    # security = models.Manager()

    @classmethod
    def create(cls, user):
        return cls(security_code=random.randrange(1000000, 9999999), account=user)

    @classmethod
    def getAllSecurityCodes(cls):
        return cls.objects.filter()

    @classmethod
    def delete(cls, sc):
        security_code = cls.objects.filter(security_code=sc)
        if len(security_code) == 0:
            raise Exception("El codigo de seguridad ya no existe")
        else:
            security_code.delete()
