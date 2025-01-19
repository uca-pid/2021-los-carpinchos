import re

from .exceptions import ProductExistsException, InvalidCategoryNameException, InvalidProductNameException, \
    InvalidProductPriceException
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
        if price < 0:
            raise InvalidProductPriceException("El precio del producto no puede ser negativo")
    except ValueError:
        raise InvalidProductPriceException(
            "El precio del producto tiene que ser un numero valido con caracteres numericos")


def product_data_validator(product_name, product_price):
    product_name = product_name.strip() #El strip me sirve para eliminar espacios en blanco antes y despues
    validate_product_existence(product_name)
    validate_product_name(product_name)
    validate_product_price(product_price)
