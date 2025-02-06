from datetime import datetime
from .exceptions import InvalidDateException, SaleProductDataException
from ..models.product import Product


def validate_sale_date(request_data):
    if 'creation_date' in request_data:
        creation_date = datetime.strptime(request_data.get('creation_date'), '%d/%m/%y %H:%M:%S').date()
        if creation_date > datetime.now().date():
            raise InvalidDateException("La fecha ingresada no puede ser futura")


def product_sale_validator(request_data):
    products = request_data.get('products')
    for product in products:
        amount = product.get('amount')
        productId = product.get('productId')
        product_bis = Product.getAllProducts().filter(
            product_id=productId).first()
        if not product_bis:
            raise SaleProductDataException("El producto ingresado no existe")
        if not isinstance(amount, int) or amount <= 0:
            raise SaleProductDataException("El cantidad ingresada del producto debe ser mayor a 0 y entera")


def validate_sale_date_update(date, existing_sale):
    new_date = datetime.strptime(date, '%d/%m/%y %H:%M:%S').date()
    existing_date = existing_sale.creation_date
    if new_date == existing_date:
        raise InvalidDateException("La fecha ingresada no puede ser la misma que ya tiene asignada la venta a modificar")
    if new_date > datetime.now().date():
        raise InvalidDateException("La fecha ingresada no puede ser futura")


def validate_sale_amount_update(amount):
    if amount is None:
        raise SaleProductDataException("La cantidad ingresada no puede estar vacía")

    if not isinstance(amount, int) or amount <= 0:
        raise SaleProductDataException("El cantidad ingresada del producto debe ser mayor a 0 y entera")


def validate_sale_update_data(date, new_amount, existing_sale):
    if date:
        validate_sale_date_update(date, existing_sale)
    if new_amount:
        validate_sale_amount_update(new_amount)
