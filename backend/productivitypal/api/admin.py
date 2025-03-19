from django.contrib import admin
from .models import Note, Todo, TodoItem

# Register your models here.
class NoteAdmin(admin.ModelAdmin):
    search_fields = ['user__username', 'title']
    list_display = ['user', 'title', 'date_created']
    list_filter = ['date_created']


class TodoAdmin(admin.ModelAdmin):
    search_fields = ['user__username', 'title', 'todoitems__title']
    list_display = ['user', 'title', 'total_todo_items', 'due_date', 'completed']
    list_filter = ['completed', 'date_created', 'due_date']


class TodoItemAdmin(admin.ModelAdmin):
    search_fields = ['todo__title', 'title']
    list_display = ['todo', 'title', 'completed']
    list_filter = ['completed']


admin.site.register(Note, NoteAdmin)
admin.site.register(Todo, TodoAdmin)
admin.site.register(TodoItem, TodoItemAdmin)
