from django.contrib.auth import get_user_model
from django.contrib.auth.forms import PasswordResetForm
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
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