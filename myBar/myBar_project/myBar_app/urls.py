from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name="home"),
    path('createAccount', views.user_create, name='user_creation'),
    path('login', views.user_log_in, name='user_log_in'),
    path('resetPassword/<int:id>', views.user_reestablish_password,
         name='reestablish_password'),
    path('updateAccountData/<int:id>',
         views.modify_user_details, name='modify_details'),
    path('accountDetails/<int:id>',
         views.get_user_details, name='get_user_details'),
    path('deleteAccount/<int:id>', views.delete_user, name='delete_user'),
    path('addNewProduct', views.register_product, name='register_product'),
<<<<<<< HEAD
    path('getAllProducts/<int:accountid>',
         views.get_all_products, name='get_all_products'),
]
=======
	path('getAllProducts', views.get_all_products, name='get_all_products'),
]
>>>>>>> origin/develop
