from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .serializers import RegisterSerializer
# Create your views here.



@api_view(['GET'])
@permission_classes([AllowAny])
def endpoints(request):
    routes = [
        {
            'Endpoint': '/api/sign-in/',
            'method': 'POST',
            'description': 'Authenticates and logs in a user',
            'expected_fields': ['username', 'password']
        },
        {
            'Endpoint': '/api/register/',
            'method': 'POST',
            'description': 'Registers a new user to the database',
            'expected_fields': ['first_name', 'last_name', 'username', 'email', 'passsword', 'password2']
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