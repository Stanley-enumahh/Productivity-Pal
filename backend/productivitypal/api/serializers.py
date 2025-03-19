from django.contrib.auth import get_user_model
from django.contrib.auth.forms import PasswordResetForm
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from .models import Note, Todo, TodoItem
import os

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({'username': 'User with this username already exists.'})
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({'email': 'User with this email already exists.'})


        return data

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        # chacking if the submitted email exists in the database
        if not User.objects.filter(email=value).exists():
            raise ValidationError(_("No user is registered with this email address."))
        return value
    
    def save(self, request):
        # creating the password reset form and initiating the reset process
        form = PasswordResetForm(data=self.validated_data)
        if form.is_valid():
            form.save(
                request=request,
                use_https=request.is_secure(),
                from_email=os.environ.get('EMAIL_USER'),
                email_template_name='emails/password_reset_email.html',
                subject_template_name='emails/password_reset_subject.txt'
            )

class UserProfileInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'last_login',
            'date_joined'
        ]


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = [
            'id',
            'title',
            'content',
            'date_created',
            'last_updated'
        ]
        read_only_fields = ['id', 'date_created', 'last_updated']


        def create(self, validated_data):
            request = self.context.get('request')
            validated_data['user'] = request.user  
            return super().create(validated_data)
        


class TodoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        fields = [
            'id',
            'todo',
            'title',
            'completed'
        ]



class TodoSerializer(serializers.ModelSerializer):
    todoitems = TodoItemSerializer(many=True, required=False)
    class Meta:
        model = Todo
        fields = [
            'id',
            'title',
            'todoitems',
            'date_created',
            'due_date',
            'completed'
        ]
        read_only_fields = ['date_created']

    
    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['user'] = request.user  # Auto-assign the user

        # Extract nested items
        todo_items_data = validated_data.pop('todoitems', [])

        # Create the Todo instance
        todo = Todo.objects.create(**validated_data)

        # Create the associated TodoItems
        for item_data in todo_items_data:
            TodoItem.objects.create(todo=todo, **item_data)
        return todo
    
    
    def update(self, instance, validated_data):
        # Extract nested items data
        items_data = validated_data.pop('todoitems', [])

        # Update the Todo instance fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update or create TodoItem objects
        instance.todoitems.all().delete()  # Delete existing items (optional, or handle updates differently)
        for item_data in items_data:
            TodoItem.objects.create(todo=instance, **item_data)

        return instance

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['todoitems'] = TodoItemSerializer(instance.todoitems.all(), many=True).data
        return response
