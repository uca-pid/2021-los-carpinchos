import re

from .exceptions import InvalidBarNameException, InvalidManagerNameException, InvalidEmailException, \
    InvalidPasswordException


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


def validate_user_email(user_email):
    email_regex = r'^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_regex, user_email):
        raise InvalidEmailException("El correo electrónico no es válido con el formato pedido")


def validate_user_password(user_password):
    password_regex = r'^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z])[A-Za-z\d@$!%*?&]{8,}$'
    if not re.match(password_regex, user_password):
        raise InvalidPasswordException(
            "La contraseña debe contener al menos 8 caracteres, "
            "incluyendo al menos un número, una letra mayúscula y un caracteres alfanuméricos."
        )


def user_data_validator(request_data):
    print("Data que el validador recibe: ", request_data)
    if 'name' in request_data:
        bar_name = request_data.get('name')
        validate_bar_name(bar_name)
    if 'manager' in request_data:
        manager_name = request_data.get('manager')
        validate_manager_name(manager_name)
    if 'email' in request_data:
        user_email = request_data.get('email')
        validate_user_email(user_email)
    if 'password' in request_data:
        user_password = request_data.get('password')
        validate_user_password(user_password)
