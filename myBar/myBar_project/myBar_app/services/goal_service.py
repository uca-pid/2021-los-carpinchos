from datetime import datetime

from .exceptions import InvalidGoalDataException, InvalidGoalPeriodException
from ..models import Category
from ..models.goal import Goal


def validate_goal_date(sent_date):
    today = datetime.today().date()
    today_year, today_month = today.year, today.month
    sent_year, sent_month = sent_date.year, sent_date.month
    if (sent_year, sent_month) < (today_year, today_month):
        raise InvalidGoalDataException("El periodo ingresado no puede ser pasado")


def validate_no_repeated_date(date):
    year = date.year
    month = date.month
    existing_goal = Goal.goals.filter(goal_date__year=year, goal_date__month=month).first()
    if existing_goal:
        raise InvalidGoalPeriodException("No se pueden crear varias metas un mismo periodo")


def validate_goal_income(incomeGoal):
    if incomeGoal is None:
        raise InvalidGoalDataException("El valor de la meta no puede estar vacía")
    try:
        value = float(incomeGoal)
    except (ValueError, TypeError):
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


def goal_data_validator(request_data, date):
    if 'incomeGoal' in request_data:
        validate_goal_income(request_data.get('incomeGoal'))
    if 'categories' in request_data:
        category_income_validator(request_data)
    if 'month' in request_data and 'year' in request_data:
        validate_goal_date(date)
        validate_no_repeated_date(date)


def goal_data_modifier_validator(request_data, goal_found):
    if 'incomeGoal' in request_data:
        validate_goal_income(request_data.get('incomeGoal'))
        validate_repeated_income_goal(goal_found, request_data.get('incomeGoal'))
    if 'categoryIncomeGoal' in request_data:
        validate_goal_income(request_data.get('categoryIncomeGoal'))
        validate_category_goal_modification(goal_found, request_data.get('categoryIncomeGoal'))
        validate_repeated_income_goal(goal_found, request_data.get('categoryIncomeGoal'))


def validate_category_goal_modification(goal_found, categoryIncomeGoal):
    try:
        categoryIncomeGoal = float(categoryIncomeGoal)
    except ValueError:
        raise InvalidGoalDataException("El valor de la meta de la categoría no es válido")

    if goal_found.incomeGoal < categoryIncomeGoal:
        raise InvalidGoalDataException("La meta de una categoria no puede ser mayor al valor de la meta general")


def validate_repeated_income_goal(goal_found, incomeGoalSent):
    incomeGoalSentNumber = float(incomeGoalSent)
    if goal_found.incomeGoal == incomeGoalSentNumber:
        raise InvalidGoalDataException("La meta que quiere modificar ya contiene ese valor asignado")
