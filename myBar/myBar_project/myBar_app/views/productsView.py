
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from ..models.user import Mb_user
from ..models.product import Product
from ..models.category import Category
from ..services.exceptions import ProductExistsException, InvalidCategoryNameException, InvalidProductNameException, \
    InvalidProductPriceException
from ..services.product_service import validate_product_existence, product_data_validator

productName = openapi.Schema(title='productName', type=openapi.TYPE_STRING)
price = openapi.Schema(title='price', type=openapi.TYPE_INTEGER)
accountId = openapi.Schema(title='price', type=openapi.TYPE_INTEGER)


@swagger_auto_schema(method='get',
                     responses={204: 'Details updated', 400: 'Invalid data'})
@api_view(['GET'])
def get_all_products(request, accountid):
    product = Product.products.filter(account_id=accountid)

    return Response(product.values('product_id', 'name', 'price', 'account_id',  'category__category_id',
                                   'category__category_name', 'category__static'), status=status.HTTP_200_OK)


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
    print("Datos recibidos:", request.data)
    try:
        product_data_validator(request.data)

        account = Mb_user.getAllUsers().filter(
            account_id=request.data.get('accountId')).first()

        category = Category.getAllCategories().filter(
            category_id=request.data.get('categoryId')).first()

        product = Product(**{'name': request.data.get('name'),
                          'price': request.data.get('price'), 'account': account, 'category': category})

        product.save()
        return Response(status=status.HTTP_201_CREATED)

    except ProductExistsException as e:
        print("Error:", str(e))
        return Response({'error': str(e)}, status=status.HTTP_409_CONFLICT)

    except InvalidProductNameException as e:
        print("Error:", str(e))
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    except InvalidProductPriceException as e:
        print("Error:", str(e))
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print("Error:", str(e))
        return Response({'error': "Error inesperado: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
def update_product_details(request, id):
    print("Datos recibidos:", request.data)
    product = Product.products.filter(product_id=id)
    product_found = product.first()
    if product_found:
        try:
            product_data_validator(request.data)

            product_found = product_found.modifyProduct(**(request.data))
            if request.data.get('categoryId'):
                category = Category.getAllCategories().filter(category_id=request.data.get('categoryId')).first()
                product_found.setCategory(category)
            product_found.full_clean()
            product_found.save()
            return Response({'name': product_found.name, 'price': product_found.price, 'id': product_found.product_id},
                            status=status.HTTP_200_OK)
        except ProductExistsException as e:
            print("Error:", str(e))
            return Response({'message': str(e)}, status=status.HTTP_409_CONFLICT)
        except InvalidProductNameException as e:
            print("Error:", str(e))
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except InvalidProductPriceException as e:
            print("Error:", str(e))
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
def delete_product(request, id):
    try:
        Product.delete(id)
        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_404_NOT_FOUND)
