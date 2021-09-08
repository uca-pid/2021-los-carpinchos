from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name="home"),
    path('createUser', views.user_create, name='user_creation'),
    path('login', views.user_log_in, name='user_log_in'),
    path('updateUserData/<int:id>', views.user_reestablish_password, name='reestablish_password'),
    path('userData/<int:id>', views.get_user_details, name='get_user_details'),
    path('deleteUser/<int:id>', views.delete_user, name='delete_user')

]