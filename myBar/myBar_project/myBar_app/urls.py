from django.urls import path
from .views import userView
from .views import productsView
from .views import categoryView
from .views import saleView


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

    path('getAllStaticCategories/<int:accountid>', categoryView.get_all_static_categories, name='get_all_static_categories'),
    path('getAllNonStaticCategories/<int:accountid>', categoryView.get_all_non_static_categories, name='get_all_non_static_categories'),
    path('updateCategoryData/<int:id>', categoryView.update_category_details, name='update_category_details'),
    path('deleteCategory/<int:id>', categoryView.delete_category, name='delete_category'),
    # Sale
    path('createSale', saleView.create_sale, name='sale_creation'),


]
