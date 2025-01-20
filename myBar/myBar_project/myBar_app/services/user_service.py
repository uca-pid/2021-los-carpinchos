import re

from .exceptions import InvalidBarNameException, InvalidManagerNameException


def validate_bar_name(bar_name):
    if not bar_name or bar_name != bar_name.strip():
        raise InvalidBarNameException(
            "Nombre del bar no puede tener espacios al inicio/fin como tampoco estar vacio")


def validate_manager_name(manager_name):
    if not manager_name or manager_name != manager_name.strip():
        raise InvalidManagerNameException(
            "El nombre del encargado no puede tener espacios al inicio ni al final, como tampoco estar vacio")

    if not re.match(r'^[a-zA-Z\s]+$', manager_name):
        raise InvalidManagerNameException("El nombre del encargado solo puede contener letras y espacios")


def user_data_validator(request_data):
    print("Data que el validador recibe: ", request_data)
    if 'name' in request_data:
        bar_name = request_data.get('name')
        validate_bar_name(bar_name)
    if 'manager' in request_data:
        manager_name = request_data.get('manager')
        validate_manager_name(manager_name)
