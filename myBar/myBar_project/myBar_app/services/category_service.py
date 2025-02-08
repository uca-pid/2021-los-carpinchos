import re

from .exceptions import CategoryAlreadyExistsException, InvalidCategoryNameException
from ..models.category import Category


def validate_category_existence(name):
    normalized_name = name.strip().lower()
    if Category.categories.filter(category_name__iexact=normalized_name).exists():
        raise CategoryAlreadyExistsException("La categoría ya existe")


def validate_category_name(name):
    if not name or name.isspace():
        raise InvalidCategoryNameException("El nombre de la categoría no puede ser vacío o solo espacios")

    if not re.match(r'^[a-zA-Z\s]+$', name):
        raise InvalidCategoryNameException(
            "El nombre de la categoria solo puede estar conformado de letras")


def category_data_validator(name):
    name = name.strip()
    validate_category_name(name)
    validate_category_existence(name)
