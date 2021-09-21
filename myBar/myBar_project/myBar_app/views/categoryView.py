
# Create your views here.
from drf_yasg import openapi
from rest_framework.decorators import api_view, renderer_classes
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse
from ..models.user import Mb_user
from ..models.category import Category

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
def category_creation(request, accountid):
    try:
        account = Mb_user.getAllUsers().filter(
            account_id=accountid).first()
        category = Category(**{'category_name': request.data.get('category_name'),'static': request.data.get('static'),
                              'account': account})
        category.full_clean()
        category.save()
        return Response( status=status.HTTP_201_CREATED)
    except Exception as e:
        if str(e) == "La categoria ya existe":
            return Response(status=status.HTTP_409_CONFLICT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_static_categories(request, accountid):
    try:
        category = Category.categories.filter(account_id=accountid)
        staticCategory = category.filter(static=True)
        return Response(staticCategory.values(), status=status.HTTP_200_OK)
    except Exception as e:
        if str(e) == "La cuenta no tiene categorias creadas":
            return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_all_non_static_categories(request, accountid):
    try:
        category = Category.categories.filter(account_id=accountid)
        staticCategory = category.filter(static=False)
        return Response(staticCategory.values(), status=status.HTTP_200_OK)
    except Exception as e:
        if str(e) == "La cuenta no tiene categorias no estaticas creadas":
            return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def update_category_details(request, id):
    category = Category.categories.filter(category_id=id)
    category_found = category.first()
    if category_found and category_found.static == False:
        try:
            category_found = category_found.modifyCategory(**(request.data))
            category_found.full_clean()
            category_found.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)

@api_view(['DELETE'])
def delete_category(request,id):
    category = Category.getAllCategories().filter(category_id=id).first()
    if category.static == False:
        try:
            Category.delete(id)
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)
