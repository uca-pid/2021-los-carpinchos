from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name="home"),
    path('createAccount', views.user_create, name='user_creation'),
    path('login', views.user_log_in, name='user_log_in'),
    path('updateAccountData/<int:id>', views.user_reestablish_password, name='reestablish_password'),
    path('accountData/<int:id>', views.get_user_details, name='get_user_details'),
    path('deleteAccount/<int:id>', views.delete_user, name='delete_user')

]