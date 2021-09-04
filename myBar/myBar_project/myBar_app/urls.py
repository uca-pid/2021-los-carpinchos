from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name="home"),
    path('user_creation/', views.user_create, name='user_creation'),
    #path('task/all', views.task_list, name='task_list'),
    #path('task/<int:id>', views.task, name='task')
]