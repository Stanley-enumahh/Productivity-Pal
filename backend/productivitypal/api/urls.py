from django.urls import path
from api import views
from .views import logout_user, request_password_reset, password_reset_confirm

urlpatterns = [
    path('api/endpoints/', views.endpoints, name="endpoints"),
    path('api/register/', views.register_user, name="register"),
    path('api/login/', views.login_user, name="register"),
    path('logout/', logout_user, name='logout'),
    path('password-reset/', request_password_reset, name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>/', password_reset_confirm, name='password-reset-confirm'),
]
