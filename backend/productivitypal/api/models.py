from django.db import models
from django.contrib import admin
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator

User = get_user_model()

# Create your models here.
class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.title

class TodoItem(models.Model):
    todo = models.ForeignKey('Todo', related_name="todoitems", on_delete=models.CASCADE)  
    title = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    date_created = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title}-{self.id}"
    
    @admin.display(description="Total Todo Items")
    def total_todo_items(self):
        return self.todoitems.count()
    

# PRIORITY_LEVEL = (
#     ('low', 'Low'),
#     ('medium', 'Medium'),
#     ('high', 'High')
# )


# class Task(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_task")
#     title = models.CharField(max_length=255)
#     description = models.TextField(blank=True, null=True)
#     priority = models.CharField(max_length=20, choices=PRIORITY_LEVEL, default='medium')
#     milesstone = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
#     members = models.ManyToManyField(User)
#     date_created = models.DateTimeField(auto_now_add=True)
#     completed = models.BooleanField(default=False)