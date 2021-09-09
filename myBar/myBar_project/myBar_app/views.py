from django.shortcuts import render

# Create your views here.
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import api_view, renderer_classes
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse
from .models import Mb_user
from .models import Product
from . import models

def index(request):
    return HttpResponse("API myBar.")
@swagger_auto_schema(method='post',
                     request_body=openapi.Schema(
                         type=openapi.TYPE_OBJECT, # object because the data is in json format
                         properties={
                             'test_token': openapi.Schema(type=openapi.TYPE_STRING, description='this test_token is used for...'),
                         }
                     ), operation_id="token_view")
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
    user = Mb_user.users.filter(email=request.data.get('email'))
    user2 = user.first()
    #user = Mb_user.getAllUsers().filter(email=request.data.get('email'))
    if user:
        password = user2.password
        if password == request.data.get('password'):
            return Response({'user_name': user2.name , 'user_id': user2.id, 'manager':user2.manager},status=status.HTTP_200_OK)

    else:
        return Response(status = status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def user_reestablish_password(request, id):
    user = Mb_user.users.filter(id=id)
    user2 = user.first()
    if user2:
        try:
            user2 = user2.modifyUser(**(request.data))
            user2.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'message': str(e)},status = status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def modify_user_details(request, id):
    user = Mb_user.users.filter(id=id)
    user2 = user.first()
    print('tipo',request.data)
    if user2:
        try:

            user2 = user2.modifyUser(**(request.data))
            #print(user2)
            user2.full_clean()
            user2.save()
            #print(user2)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'message': str(e)},status = status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_user_details(request,id):
    user_bis = Mb_user.getAllUsers().filter(id=id)
    #user = user_bis.first()
    if user_bis:
        return Response(user_bis.values(), status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_user(request,id):
    user = Mb_user.getAllUsers().filter(id=id)
    try:
        Mb_user.delete(id)
        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def register_product(request):
    try:
        product = Product(**request.data)
        product.save()
        return Response(status=status.HTTP_201_CREATED)
    except Exception as e:
        if str(e) == "El producto ya existe":
            return Response(status = status.HTTP_409_CONFLICT)
        else:
            return Response(status = status.HTTP_400_BAD_REQUEST)
