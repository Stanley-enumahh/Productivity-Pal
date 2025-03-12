from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, PasswordResetSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_decode

User = get_user_model()


@api_view(['GET'])
@permission_classes([AllowAny])
def endpoints(request):
    routes = [
        {
            'Endpoint': '/api/login/',
            'method': 'POST',
            'description': 'Authenticates and logs in a user',
            'expected_data': ['username', 'password']
        },
        {
            'Endpoint': '/api/register/',
            'method': 'POST',
            'description': 'Registers a new user to the database',
            'expected_data': ['first_name', 'last_name', 'username', 'email', 'passsword', 'password2']
        },
        {
            'Endpoint': '/api/logout/',
            'method': 'POST',
            'description': 'Logs out a user',
            'expected_data': ['refresh_token'],
            'authorization': "Bearer {acess_token}"
        },
        {
            'Endpoint': '/api/password-reset/',
            'method': 'POST',
            'description': 'Starts the password reset process and sends the user a password reset link',
            'expected_data': ['email'],
        },
        {
            'Endpoint': '/api/confirm-password-reset/<uidb64>/<token>/',
            'method': 'POST',
            'description': 'Confirm password request and sets the new password for the user',
            'expected_data': ['new_password', 'confirm_password'],
            'url_parameters': ['uidb64', 'token']
        },
    ]

    return Response(routes)


#  Authentication views

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    if request.method == "POST":
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():  
            user = serializer.save()
            # Generate JWT token and login user
            refresh = RefreshToken.for_user(user)

            return Response({
                'message': 'User registered successfully',
                'refresh_token': str(refresh),
                'access_token': str(refresh.access_token),
                'username': user.username
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)


    if user is not None:
         # Generate JWT token and login user
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'refresh_token': str(refresh),
            'access_token': str(refresh.access_token),
            'username': user.username
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    print('yes')
    try:
        refresh_token = request.data.get('refresh_token')
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([AllowAny])
def request_password_reset(request):
    serializer = PasswordResetSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(request=request)
        return Response({'message': 'Password reset email has been sent.'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if new_password != confirm_password:
            return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        # Set the new password
        user.set_password(new_password)
        user.save()
        # user.password = make_password(new_password)

        return Response({"message": "Password has been reset successfully"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid token or user"}, status=status.HTTP_400_BAD_REQUEST)