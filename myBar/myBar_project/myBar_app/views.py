from django.shortcuts import render

# Create your views here.
from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.views import View

from rest_framework.decorators import api_view, renderer_classes
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse

#from .parser import *

from .models import Mb_user
from .serializer import Serializer
from . import models

def index(request):
    return HttpResponse("API myBar.")

@api_view(['POST'])
def user_create(request):
    try:
        user = Mb_user(**request.data)
        user.save()
        return Response(status=status.HTTP_201_CREATED)
    except Exception as e:
        if str(e) == "El usuario ya existe":
            return Response(status = status.HTTP_409_CONFLICT)
        else:
            return Response(status = status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_log_in(request):

    user = Mb_user.getAllUsers().filter(email=request.data.get('email'))
    if user:
        return Response(status=status.HTTP_200_OK)

    else:
        return Response(status = status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def user_reestablish_password(request, id):
    #user = Mb_user.getAllUsers().filter(email=request.data.get('email'))
    user = Mb_user.users.filter(id=id)
    user2 = user.first()
    print(user2.password)
    if user2:
        try:
            #(request.data).pop('id', None)
            #print('rompio')
            user2 = user2.modifyUser(**(request.data))
            user2.save()
            #print(user2.password)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'message': str(e)},status = status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_user_details(request,id):
    method = request.method
    return user_detail(request, id)

@api_view(['DELETE'])
def delete_user(request,id):
    user = Mb_user.getAllUsers().filter(id=id)
    try:
        Mb_user.delete(id)
        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_404_NOT_FOUND)

def user_detail(request,id):
    user_bis = Mb_user.getAllUsers().filter(id=id)
    user = user_bis.first()
    if user:
        return Response(user, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


def register_product(request):
    try:
        user = Mb_user(**request.data)
        user.save()
        return Response(status=status.HTTP_201_CREATED)
    except Exception as e:
        if str(e) == "El usuario ya existe":
            return Response(status = status.HTTP_409_CONFLICT)
        else:
            return Response(status = status.HTTP_400_BAD_REQUEST)
