from calendar import monthrange

from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.utils import json
import datetime

from ..models import Category
from ..models.user import Mb_user
from ..models.goal import Goal
from ..models.goal_category import Goal_Category
from ..models.sale import Sale

from django.db.models import Q

from ..services.exceptions import InvalidGoalDataException, InvalidGoalPeriodException
from ..services.goal_service import validate_goal_date, validate_no_repeated_date, validate_goal_income, \
    category_income_validator, goal_data_validator, goal_data_modifier_validator, validate_category_goal_modification


@api_view(['POST'])
def create_goal(request, accountId):
    print("Datos recibidos:", request.data)
    try:
        month = request.data.get('month')
        year = request.data.get('year')
        account = Mb_user.getAllUsers().filter(
            account_id=accountId).first()
        date = datetime.date(year, month, 1)
        goal_data_validator(request.data, date)
        goal = Goal(**{'goal_date': date,
                       'incomeGoal': request.data.get('incomeGoal'),
                       'account': account})
        goal.full_clean()
        goal.save()
        categories = request.data.get('categories')
        for category in categories:
            categoryId = category['categoryId']
            findCategoryById = Category.getAllCategories().filter(
                category_id=categoryId).first()
            incomeByCategory = category['categoryIncomeGoal']
            goal_category = Goal_Category(
                **{'category': findCategoryById, 'goal': goal, 'categoryIncomeGoal': incomeByCategory})
            goal_category.full_clean()
            goal_category.save()
        return Response({'goal_id': goal.goal_id}, status=status.HTTP_201_CREATED)

    except InvalidGoalDataException as e:
        print("Error:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    except InvalidGoalPeriodException as e:
        print("Error:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_409_CONFLICT)

    except Exception as e:
        print("Error inesperado:", str(e))
        return Response({"error": "Ocurrió un error interno"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_current_goal(request, accountid):
    try:
        date = datetime.date.today()
        month = date.month
        year = date.year

        _, day = monthrange(year, month)

        goal = Goal.goals.filter(account_id=accountid).values().first()

        categories = Goal.goals.filter(account_id=accountid, goal_date__year=year, goal_date__month=month).values(
            "goals_categories__categoryIncomeGoal",
            "goals_categories__category__category_id",
            "goals_categories__category__category_name"
        )
        sale_product_id = Sale.sales.filter(account_id=accountid).filter(
            creation_date__range=(datetime.date(year, month, 1), datetime.date(year, month, day))).values("sale_id",
                                                                                                          "sale_products__id_sale_product",
                                                                                                          "sale_products__quantity_of_product",
                                                                                                          "sale_products__product__product_id",
                                                                                                          "sale_products__product__name",
                                                                                                          "sale_products__product__price",
                                                                                                          "sale_products__product__category__category_id",
                                                                                                          "sale_products__product__category__category_name",
                                                                                                          "sale_products__product__category__static")

        json_enorme = []
        mini_json = []
        income = 0
        categories = list(categories)
        if len(categories) > 0:
            for category in categories:
                for sale in sale_product_id:
                    if category["goals_categories__category__category_name"] == sale[
                        "sale_products__product__category__category_name"]:
                        income = income + (
                                sale["sale_products__quantity_of_product"] * sale["sale_products__product__price"])
                data1 = {"categoryName": category["goals_categories__category__category_name"],
                         "categoryId": category['goals_categories__category__category_id'],
                         "categoryIncomeGoal": category["goals_categories__categoryIncomeGoal"],
                         "totalCategoryIncome": income}
                mini_json.append(data1)
                income = 0
            data2 = {
                "incomeGoal": goal['incomeGoal'],
                "month": month,
                "year": year,
                "incomeByCategory": mini_json
            }
            json_enorme.append(data2)
            return Response(json_enorme, status=status.HTTP_200_OK)
        return Response([], status=status.HTTP_200_OK)
    except Exception as e:
        print("Error:", str(e))
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_goals(request, accountid):
    try:
        date = datetime.date.today()
        month = date.month
        year = date.year

        goals = Goal.goals.filter(Q(account_id=accountid) & Q(
            goal_date__gte=datetime.date.today())).values()

        sale_product_id = Sale.sales.filter(account_id=accountid).filter(
            creation_date__lt=datetime.date(year, month, 1)).values("sale_id", "creation_date",
                                                                    "sale_products__id_sale_product",
                                                                    "sale_products__quantity_of_product",
                                                                    "sale_products__product__product_id",
                                                                    "sale_products__product__name",
                                                                    "sale_products__product__price",
                                                                    "sale_products__product__category__category_id",
                                                                    "sale_products__product__category__category_name",
                                                                    "sale_products__product__category__static")

        json_enorme = []

        income = 0
        for goal in goals:

            categories = Goal_Category.goal_categories.filter(goal_id=goal['goal_id']).values(
                "categoryIncomeGoal",
                "category_id",
                "category__category_name",
                "id_goal_category"
            )
            mini_json = []
            for category in categories:

                sale_product_id = Sale.sales.filter(account_id=accountid).filter(
                    creation_date__lt=datetime.date(year, month, 1)).values("sale_id", "creation_date",
                                                                            "sale_products__id_sale_product",
                                                                            "sale_products__quantity_of_product",
                                                                            "sale_products__product__product_id",
                                                                            "sale_products__product__name",
                                                                            "sale_products__product__price",
                                                                            "sale_products__product__category__category_id",
                                                                            "sale_products__product__category__category_name",
                                                                            "sale_products__product__category__static")

                for sale in sale_product_id:
                    if category['category__category_name'] == sale["sale_products__product__category__category_name"]:
                        income = income + (
                                sale["sale_products__quantity_of_product"] * sale["sale_products__product__price"])

                data1 = {"categoryName": category['category__category_name'],
                         "categoryId": category['category_id'],
                         "idGoalCategory": category['id_goal_category'],
                         "categoryIncomeGoal": category["categoryIncomeGoal"],
                         "totalCategoryIncome": income}
                mini_json.append(data1)
                income = 0
            data2 = {
                "id": goal['goal_id'],
                "incomeGoal": goal['incomeGoal'],
                "month": goal['goal_date'].month,
                "year": goal['goal_date'].year,
                "incomeByCategory": mini_json
            }
            json_enorme.append(data2)
        return Response(json_enorme, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_past_goals(request, accountid):
    try:
        date = datetime.date.today()
        month = date.month
        year = date.year

        goals = Goal.goals.filter(Q(account_id=accountid) & Q(
            goal_date__lt=datetime.date(year, month, 1))).values()

        sale_product_id = Sale.sales.filter(account_id=accountid).filter(
            creation_date__lt=datetime.date(year, month, 1)).values("sale_id", "creation_date",
                                                                    "sale_products__id_sale_product",
                                                                    "sale_products__quantity_of_product",
                                                                    "sale_products__product__product_id",
                                                                    "sale_products__product__name",
                                                                    "sale_products__product__price",
                                                                    "sale_products__product__category__category_id",
                                                                    "sale_products__product__category__category_name",
                                                                    "sale_products__product__category__static")

        json_enorme = []

        income = 0
        for goal in goals:

            categories = Goal_Category.goal_categories.filter(goal_id=goal['goal_id']).values(
                "id_goal_category",
                "categoryIncomeGoal",
                "category_id",
                "category__category_name",

            )
            mini_json = []
            for category in categories:

                sale_product_id = Sale.sales.filter(account_id=accountid).filter(
                    creation_date__lt=datetime.date(year, month, 1)).values("sale_id", "creation_date",
                                                                            "sale_products__id_sale_product",
                                                                            "sale_products__quantity_of_product",
                                                                            "sale_products__product__product_id",
                                                                            "sale_products__product__name",
                                                                            "sale_products__product__price",
                                                                            "sale_products__product__category__category_id",
                                                                            "sale_products__product__category__category_name",
                                                                            "sale_products__product__category__static")

                for sale in sale_product_id:
                    if category['category__category_name'] == sale["sale_products__product__category__category_name"]:
                        income = income + (
                                sale["sale_products__quantity_of_product"] * sale["sale_products__product__price"])

                data1 = {"categoryName": category['category__category_name'],
                         "categoryId": category['category_id'],
                         "idGoalCategory": category['id_goal_category'],
                         "categoryIncomeGoal": category["categoryIncomeGoal"],
                         "totalCategoryIncome": income}
                mini_json.append(data1)
                income = 0
            data2 = {
                "id": goal['goal_id'],
                "incomeGoal": goal['incomeGoal'],
                "month": goal['goal_date'].month,
                "year": goal['goal_date'].year,
                "incomeByCategory": mini_json
            }
            json_enorme.append(data2)
        return Response(json_enorme, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_goal_details(request, goal_id):
    print("Datos recibidos:", request.data)
    goal = Goal.goals.filter(goal_id=goal_id)
    goal_found = goal.first()
    if (goal_found.goal_date.month > (datetime.date.today().month) and goal_found.goal_date.year >= (
            datetime.date.today().year)) or (
            goal_found.goal_date.month > (datetime.date.today().month) and goal_found.goal_date.year > (
            datetime.date.today().year)):
        try:
            goal_data_modifier_validator(request.data, goal_found)
            goal_found = goal_found.modify_Goal(**(request.data))
            goal_found.full_clean()
            goal_found.save()
            return Response(status=status.HTTP_200_OK)
        except InvalidGoalDataException as e:
            print("Error:", str(e))
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("Error inesperado:", str(e))
            return Response({'message': 'Error interno del servidor'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response({'message': 'La meta ya ha pasado el periodo de modificación'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
def delete_goal(request, goal_id):
    try:
        Goal.delete(goal_id)
        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
def delete_goal_category(request, goal_category_id):
    try:
        Goal_Category.delete(goal_category_id)
        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_404_NOT_FOUND)
