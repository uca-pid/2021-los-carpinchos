from django.urls import path
from .views import userView
from .views import productsView


urlpatterns = [
    # user
    path('', userView.index, name="home"),
    path('createAccount', userView.user_create, name='user_creation'),
    path('login', userView.user_log_in, name='user_log_in'),
    path('resetPassword/<int:id>', userView.user_reestablish_password,
         name='reestablish_password'),
    path('updateAccountData/<int:id>',
         userView.modify_user_details, name='modify_details'),
    path('accountDetails/<int:id>',
         userView.get_user_details, name='get_user_details'),
    path('deleteAccount/<int:id>', userView.delete_user, name='delete_user'),
    # product
    path('addNewProduct', productsView.register_product, name='register_product'),
    path('getAllProducts/<int:accountid>',
         productsView.get_all_products, name='get_all_products'),
]
