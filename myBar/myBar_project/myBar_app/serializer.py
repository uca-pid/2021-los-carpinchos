from rest_framework import serializers
from .models import Mb_user as mb_user


class Serializer(serializers.ModelSerializer):

    class Meta:
        model = mb_user
        fields = ('id',
                  'name',
                  'manager',
                  'email',
                  'password')