import datetime

from django.http import JsonResponse
from rest_framework.decorators import api_view, renderer_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.utils import json

from ..models.product import Product
from ..models.sale_product import Sale_Product
from ..models.user import Mb_user
from ..models.sale import Sale
from rest_framework.renderers import JSONRenderer

from ..serializers.saleSerializer import SaleSerializer
from dateutil import rrule

@api_view(['POST'])
def create_sale(request, accountId):
    try:
        account = Mb_user.getAllUsers().filter(
            account_id=accountId).first()
        sale = Sale(**{'creation_date': request.data.get('creation_date'),
                       'account': account})
        sale.full_clean()
        sale.save()
        products = request.data.get('products')
        for product in products:
            productId = product['productId']
            product_bis = Product.getAllProducts().filter(
                product_id=productId).first()
            amount = product['amount']
            sale_product = Sale_Product(**{'product': product_bis, 'sale': sale, 'quantity_of_product': amount})
            sale_product.full_clean()
            sale_product.save()

        return Response({'sale_id': sale.sale_id}, status=status.HTTP_201_CREATED)
    except Exception as e:
        if str(e) == "La venta ya existe":
            return Response(status=status.HTTP_409_CONFLICT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_sales(request, accountid):
    sale = Sale.sales.filter(account_id=accountid).values()
    #print(sale)
    sale_ids = Sale.sales.filter(account_id=accountid).values()
    sale_product_id = Sale.sales.filter(account_id=accountid).values("sale_id", "sale_products__id_sale_product",
                                                                     "sale_products__quantity_of_product",
                                                                     "sale_products__product__product_id",
                                                                     "sale_products__product__name",
                                                                     "sale_products__product__price",
                                                                     "sale_products__product__category__category_id",
                                                                     "sale_products__product__category__category_name",
                                                                     "sale_products__product__category__static")
    json_enorme = []
    for id in sale_ids:
        json_list=[]
        id = id['sale_id']
        products_by_sale_id = sale_product_id.filter(sale_id= id).values("sale_id", "sale_products__id_sale_product",
                                                                         "sale_products__quantity_of_product",
                                                                         "sale_products__product__product_id",
                                                                         "sale_products__product__name",
                                                                         "sale_products__product__price",
                                                                         "sale_products__product__category__category_id",
                                                                         "sale_products__product__category__category_name",
                                                                         "sale_products__product__category__static")
        #print(products_by_sale_id)
        for product in products_by_sale_id:
            #print(product)
            data = {
                "sale_products": product["sale_products__id_sale_product"],
                "quantity_of_product": product["sale_products__quantity_of_product"],
                "product":
                    {
                        "product_id": product["sale_products__product__product_id"],
                        "name": product["sale_products__product__name"],
                        "price": product["sale_products__product__price"],
                        "category":
                            {
                                "category_id": product["sale_products__product__category__category_id"],
                                "category_name": product["sale_products__product__category__category_name"],
                                "category_static": product["sale_products__product__category__static"]
                            }
                    }
            }
            json_list.append(data)
        data2 = {"sale_id": id,
                 "sale_product":json_list
                 }
        json_enorme .append(data2)

    return Response(json_enorme, status=status.HTTP_200_OK)


@api_view(['PUT'])
def update_sale_details(request, sale_id):
    sale = Sale.sales.filter(sale_id=sale_id)
    sale_found = sale.first()
    if sale_found:
        try:
            sale_found = sale_found.modify_Sale(**(request.data))
            sale_found.full_clean()
            sale_found.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
@api_view(['POST'])
def get_all_sales_by_date(request, accountid):
    try:
        fromDay = request.data.get('fromDay')
        fromMonth = request.data.get('fromMonth')
        fromYear = request.data.get('fromYear')
        toMonth = request.data.get('toMonth')
        toYear = request.data.get('toYear')
        toDay = request.data.get('toDay')
        sales_ids = Sale.sales.filter(account_id=accountid).values()
        sale_product_id = Sale.sales.filter(account_id=accountid).exclude(
            creation_date__gt=datetime.date(toYear, toMonth, toDay),
            creation_date__lte=datetime.date(fromYear, fromMonth, fromDay)).values("sale_id", 'creation_date',
                                                                                   "sale_products__id_sale_product",
                                                                                   "sale_products__quantity_of_product",
                                                                                   "sale_products__product__product_id",
                                                                                   "sale_products__product__name",
                                                                                   "sale_products__product__price")

        json_enorme = []
        income = 0
        dates = list(rrule.rrule(rrule.MONTHLY, dtstart=datetime.date(fromYear, fromMonth, fromDay),
                                 until=datetime.date(toYear, toMonth, toDay)))
        for date in dates:

            for sale in sale_product_id:

                sale_product_id = Sale.sales.filter(account_id=accountid).exclude(
                    creation_date__gt=datetime.date(toYear, toMonth, toDay),
                    creation_date__lte=datetime.date(fromYear, fromMonth, fromDay)).values("sale_id",
                                                                                           "creation_date",
                                                                                           "sale_products__id_sale_product",
                                                                                           "sale_products__quantity_of_product",
                                                                                           "sale_products__product__product_id",
                                                                                           "sale_products__product__name",
                                                                                           "sale_products__product__price", )

                creation_date = sale['creation_date']

                if date.year == creation_date.year and date.month == creation_date.month:
                    income = income + (sale["sale_products__quantity_of_product"] * sale["sale_products__product__price"])

            data2 = {"month": date.month,
                     "year": date.year,
                     "income": income
                     }
            json_enorme.append(data2)

            income = 0
        print(json_enorme)
        return Response(json_enorme, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_sale(request, sale_id):
    try:
        Sale.delete(sale_id)
        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_404_NOT_FOUND)
