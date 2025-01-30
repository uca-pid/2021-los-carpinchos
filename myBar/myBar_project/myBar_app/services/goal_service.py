from datetime import datetime

from .exceptions import InvalidGoalDataException
from ..models import Category
from ..models.goal import Goal


def validate_goal_date(sent_date):
    today = datetime.today().date()
    today_year, today_month = today.year, today.month
    sent_year, sent_month = sent_date.year, sent_date.month
    if (sent_year, sent_month) < (today_year, today_month):
        raise InvalidGoalDataException("El periodo ingresado no puede ser pasado")


def validate_no_repeated_date(year, month):
    existing_goal = Goal.goals.filter(goal_date__year=year, goal_date__month=month).first()
    if existing_goal:
        raise InvalidGoalDataException("No se pueden crear varias metas un mismo periodo")


def validate_goal_income(incomeGoal):
    if incomeGoal is None:
        raise InvalidGoalDataException("El valor de la meta no puede estar vacía")
    try:
        value = float(incomeGoal)
    except ValueError:
        raise InvalidGoalDataException("El valor de la meta debe ser un numero valido")

    if value <= 0:
        raise InvalidGoalDataException("El valor de la meta debe ser un numero positivo")


def category_income_validator(request_data):
    categories = request_data.get('categories')
    finalGoalIncomeRecieved = float(request_data.get('incomeGoal'))
    finalGoalIncome = 0
    for category in categories:
        categoryIncome = category.get('categoryIncomeGoal')
        categoryId = category.get('categoryId')
        category_bis = Category.getAllCategories().filter(
            category_id=categoryId).first()
        if not category_bis:
            raise InvalidGoalDataException("La categoria ingresada en la meta no existe")
        try:
            categoryIncomeNum = float(categoryIncome)
            finalGoalIncome = finalGoalIncome + categoryIncomeNum
        except ValueError:
            print(ValueError)
            raise InvalidGoalDataException("El valor de la meta por categoria debe ser un número válido")

        if categoryIncomeNum <= 0:
            raise InvalidGoalDataException("El meta ingresada por categoria debe ser mayor a O")

    print("Income total calculado:", finalGoalIncome)
    print("El del request: ", finalGoalIncomeRecieved)
    if finalGoalIncome != finalGoalIncomeRecieved:
        raise InvalidGoalDataException("La sumatoria de las metas por categoria debe ser igual a la meta general")