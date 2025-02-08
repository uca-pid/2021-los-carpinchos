import re

from .exceptions import ProductExistsException, InvalidCategoryNameException, InvalidProductNameException, \
    InvalidProductPriceException
from ..models import Category
from ..models.product import Product


def validate_product_existence(product_name):
    normalized_product_name = product_name.strip().lower()
    if Product.products.filter(name__iexact=normalized_product_name).exists():
        raise ProductExistsException("El producto que intenta registrar ya existe")


def validate_product_name(product_name):
    if not product_name or product_name.isspace():
        raise InvalidProductNameException("El nombre del producto no puede ser vacío")

    if not re.match(r'^[a-zA-Z\s]+$', product_name):
        raise InvalidProductNameException(
            "El nombre del producto no puede tener caracteres que no sean letras mayusculas o minusculas")


def validate_product_price(product_price):
    try:
        price = float(product_price)
        if price <= 0:
            raise InvalidProductPriceException("El precio del producto no puede ser negativo o 0")
    except ValueError:
        raise InvalidProductPriceException(
            "El precio del producto tiene que ser un numero valido con caracteres numericos")


def validate_category_exists(category_id):
    category = Category.getAllCategories().filter(category_id=category_id).first()
    if not category:
        raise InvalidCategoryNameException("La categoría seleccionada no existe.")


def product_data_validator(request_data):
    print("Data que el validador recibe: ", request_data)
    if 'name' in request_data:
        product_name = request_data.get('name')
        product_name = product_name.strip()
        validate_product_existence(product_name)
        validate_product_name(product_name)
    if 'price' in request_data:
        product_price = request_data.get('price')
        validate_product_price(product_price)
    if 'categoryId' in request_data:
        category_id = request_data.get('categoryId')
        validate_category_exists(category_id)
