from django.db import models

# Create your models here.
class Mb_user(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=25)
    manager = models.CharField(max_length=30)
    email = models.EmailField(max_length=254,unique=True)
    password = models.CharField(max_length=256)
    users = models.Manager()

    # getter method
    def getName(self):
        return self.name

    # setter method
    def setName(self, x):
        #print("holssss")
        self.name = x

    # getter method
    def getEmail(self):
        return self.email

    # setter method
    def setEmail(self, x):
        self.email = x

    # getter method
    def getManager(self):
        return self.manager

    # setter method
    def setManager(self, x):
        self.manager = x

    # getter method
    def getPassword(self):
        return self.password

    # setter method
    def setPassword(self, x):
        self.password = x

    @classmethod
    def getAllUsers(cls):
        return cls.users.filter()

    @classmethod
    def delete(cls,id):
        user = cls.users.filter(id=id)
        if len(user) == 0:
            raise Exception("El usuario a eliminar no existe")
        else:
            user.delete()


    def modifyUser(self, **argsToChange):
        #print(type(argsToChange))
        keys = argsToChange.keys()
        #print(keys)
        for arg in keys:
            #print('hola',argsToChange[arg])
            setattr(self, arg, argsToChange[arg])
        return self

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=25)
    price = models.IntegerField()
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
    def delete(cls,id):
        product= cls.products.filter(id=id)
        if len(product) == 0:
            raise Exception("El usuario a eliminar no existe")
        else:
            product.delete()


    def modifyProduct(self, **argsToChange):
        keys = argsToChange.keys()
        for arg in keys:
            setattr(self, arg, argsToChange[arg][0])
        return self