from django.urls import path
from api import views

urlpatterns = [
    path('api/endpoints/', views.endpoints, name="endpoints"),
    path('api/register/', views.register_user, name="register"),
    path('api/login/', views.login_user, name="register"),
    path('api/logout/', views.logout_user, name='logout'),
    path('api/password-reset/', views.request_password_reset, name='password_reset'),
    path('api/confirm-password-reset/<uidb64>/<token>/', views.password_reset_confirm, name='password-reset-confirm'),
    path('api/get-profile-info/', views.get_profile_info, name="get_user_info")
]