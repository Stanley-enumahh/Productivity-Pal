from django.urls import path
from api import views

urlpatterns = [
    path('api/endpoints/', views.endpoints, name="endpoints"),
    path('api/register/', views.register_user, name="register"),
    path('api/login/', views.login_user, name="register"),
]
