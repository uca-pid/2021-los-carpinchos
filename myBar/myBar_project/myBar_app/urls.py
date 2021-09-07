from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name="home"),
    path('user_creation/', views.user_create, name='user_creation'),
    path('user_log_in/', views.user_log_in, name='user_log_in'),
    path('reestablish_password/<int:id>', views.user_reestablish_password, name='reestablish_password'),
    path('modify_details/<int:id>', views.modify_user_details, name='modify_details'),
    path('get_user_details/<int:id>', views.get_user_details, name='get_user_details'),
    path('delete_user/<int:id>', views.delete_user, name='delete_user'),
    path('register_product/', views.register_product, name='register_product'),

]