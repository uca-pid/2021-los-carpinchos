from django.urls import path
from .views import userView
from .views import productsView
from .views import categoryView
from .views import saleView
from .views import goalView


urlpatterns = [
    # user
    path('', userView.index, name="home"),
    path('createAccount', userView.user_create, name='user_creation'),
    path('login', userView.user_log_in, name='user_log_in'),
    path('updateAccountData/<int:id>', userView.modify_user_details, name='modify_details'),
    path('accountDetails/<int:id>',  userView.get_user_details, name='get_user_details'),
    path('deleteAccount/<int:id>', userView.delete_user, name='delete_user'),
    # reset password
    path('requestPasswordReestablishment', userView.allow_password_reestablishment,
         name='allow_password_reestablishment'),
    path('validateCode', userView.validate_code, name='reestablish_password'),
    path('resetPassword', userView.reestablish_password, name='reestablish_password'),
    # product
    path('addNewProduct', productsView.register_product, name='register_product'),
    path('getAllProducts/<int:accountid>', productsView.get_all_products, name='get_all_products'),
    path('updateProductData/<int:id>', productsView.update_product_details, name='update_product_details'),
    path('deleteProduct/<int:id>', productsView.delete_product, name='delete_product'),
    # Category
    path('createCategory/<int:accountid>', categoryView.category_creation, name='category_creation'),
    path('getAllStaticCategories', categoryView.get_all_static_categories, name='get_all_static_categories'),
    path('getAllNonStaticCategories/<int:accountid>',
         categoryView.get_all_non_static_categories, name='get_all_non_static_categories'),
    path('updateCategoryData/<int:id>', categoryView.update_category_details, name='update_category_details'),
    path('deleteCategory/<int:id>', categoryView.delete_category, name='delete_category'),
    # Sale
    path('createSale/<int:accountId>', saleView.create_sale, name='sale_creation'),
    path('getAllSales/<int:accountid>', saleView.get_all_sales, name='get_all_sales'),
    path('updateSaleData/<int:sale_id>', saleView.update_sale_details, name='update_sale_details'),
    path('deleteSale/<int:sale_id>', saleView.delete_sale, name='delete_sale'),
    path('getAllSalesByDate/<int:accountid>', saleView.get_all_sales_by_date, name='get_all_sales_by_date'),
    path('deleteSaleProduct/<int:sale_product_id>', saleView.delete_sale_product, name='delete_sale_product'),
    path('getIncomeByCategory/<int:accountid>', saleView.get_income_by_category , name = 'get_income_by_category'),
    #Goal
    path('createGoal/<int:accountId>', goalView.create_goal, name='goal_creation'),
    path('getCurrentGoal/<int:accountid>', goalView.get_current_goal, name='get_current_goal'),
    path('getAllGoals/<int:accountid>', goalView.get_all_goals, name='get_all_goals'),
    path('updateGoalData/<int:goal_id>', goalView.update_goal_details, name='update_goal_details'),
    path('deleteGoalCategory/<int:goal_category_id>', goalView.delete_goal_category, name='delete_goal_category'),
    path('deleteGoal/<int:goal_id>', goalView.delete_goal, name='delete_goal'),


]
