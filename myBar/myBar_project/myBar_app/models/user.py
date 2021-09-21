from django.db import models


class Mb_user(models.Model):

    account_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=25)
    manager = models.CharField(max_length=30)
    email = models.EmailField(max_length=254, unique=True)
    password = models.CharField(max_length=256)
    users = models.Manager()

    def getId(self):
        return self.account_id
    # getter method
    def getName(self):
        return self.name

    # getter method
    def getEmail(self):
        return self.email

    # getter method
    def getManager(self):
        return self.manager

    # getter method
    def getPassword(self):
        return self.password

    @classmethod
    def getAllUsers(cls):
        return cls.users.filter()

    @classmethod
    def delete(cls, id):
        user = cls.users.filter(account_id=id)
        if len(user) == 0:
            raise Exception("El usuario a eliminar no existe")
        else:
            user.delete()

    def modifyUser(self, **argsToChange):
        keys = argsToChange.keys()
        for arg in keys:
            setattr(self, arg, argsToChange[arg])
        return self
