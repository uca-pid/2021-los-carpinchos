from django.core.mail import send_mail
from django.shortcuts import render

# Create your views here.
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import api_view, renderer_classes
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse

from ..models.securityCode import SecurityCode
from ..models.user import Mb_user
from ..models.category import Category
# from ...myBar_project.settings import

import myBar_project

EMAIL_HOST_USER = myBar_project.settings.EMAIL_HOST_USER

password = openapi.Schema(title='password', type=openapi.TYPE_STRING)
email = openapi.Schema(title='email', type=openapi.TYPE_STRING)
manager = openapi.Schema(title='manager', type=openapi.TYPE_STRING)
name = openapi.Schema(title='name', type=openapi.TYPE_STRING)
productName = openapi.Schema(title='productName', type=openapi.TYPE_STRING)
price = openapi.Schema(title='price', type=openapi.TYPE_INTEGER)
accountId = openapi.Schema(title='price', type=openapi.TYPE_INTEGER)


def index(request):
    return HttpResponse("API myBar.")


@api_view(['POST'])
def category_creation(request):
    try:
        category = Category(**request.data)
        category.full_clean()
        category.save()
        return Response( status=status.HTTP_201_CREATED)
    except Exception as e:
        if str(e) == "El usuario ya existe":
            return Response(status=status.HTTP_409_CONFLICT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

