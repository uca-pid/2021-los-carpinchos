from django.shortcuts import render

# Create your views here.
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import api_view, renderer_classes
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse
from ..models.user import Mb_user
from ..models.product import Product


productName = openapi.Schema(title='productName', type=openapi.TYPE_STRING)
price = openapi.Schema(title='price', type=openapi.TYPE_INTEGER)
accountId = openapi.Schema(title='price', type=openapi.TYPE_INTEGER)


@swagger_auto_schema(method='get',
                     responses={204: 'Details updated', 400: 'Invalid data'})
@api_view(['GET'])
def get_all_products(request, accountid):
    product = Product.products.filter(account_id=accountid)

    return Response(product.values(), status=status.HTTP_200_OK)


@swagger_auto_schema(method='post',
                     request_body=openapi.Schema(
                         type=openapi.TYPE_OBJECT,  # object because the data is in json format
                         required=['version'],
                         properties={
                             'name': productName,
                             'price': price,
                             'accountId': accountId,
                         }
                     ), responses={201: 'Product registration successfull', 400: 'Invalid request',  409: 'The product already exists'})
@api_view(['POST'])
def register_product(request):
    try:
        account = Mb_user.getAllUsers().filter(
            account_id=request.data.get('accountId')).first()

        product = Product(**{'name': request.data.get('name'),
                          'price': request.data.get('price'), 'account': account})

        product.save()
        return Response(status=status.HTTP_201_CREATED)
    except Exception as e:
        if str(e) == "El producto ya existe":
            return Response(status=status.HTTP_409_CONFLICT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
