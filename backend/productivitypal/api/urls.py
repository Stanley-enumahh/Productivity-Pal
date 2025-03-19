from django.urls import path
from api import views

urlpatterns = [
    path('api/endpoints/', views.endpoints, name="endpoints"),
    path('api/register/', views.register_user, name="register"),
    path('api/login/', views.login_user, name="register"),
    path('api/logout/', views.logout_user, name='logout'),
    path('api/password-reset/', views.request_password_reset, name='password_reset'),
    path('api/confirm-password-reset/<uidb64>/<token>/', views.password_reset_confirm, name='password-reset-confirm'),
    path('api/get-profile-info/', views.get_profile_info, name="get_user_info"),
    path('api/notes/', views.NoteListCreateView.as_view(), name="note_list_create"),
    path('api/notes/<int:pk>/', views.NoteDetailView.as_view(), name="note_detail"),
    path('api/todos/', views.TodoListCreateView.as_view(), name="todo_list_create"),
    path('api/todos/<pk>/', views.TodoDetailView.as_view(), name="todo_detail"),
    path('api/todoitems/', views.TodoItemListCreateView.as_view(), name="todoitems_list_create"),
    path('api/todoitems/<pk>/', views.TodoItemDetailView.as_view(), name="todoitems_detail"),
]