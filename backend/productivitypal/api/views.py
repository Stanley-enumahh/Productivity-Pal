from django.contrib.auth import authenticate
from rest_framework import status, generics, permissions
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Note, Todo, TodoItem
from .serializers import RegisterSerializer, PasswordResetSerializer, UserProfileInfoSerializer, NoteSerializer, TodoSerializer, TodoItemSerializer
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
            'expected_data': ['username', 'email', 'passsword']
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
        {
            'Endpoint': 'api/get-profile-info/',
            'method': 'GET',
            'description': 'Confirm if a user is registered and returns the profile information of that user',
            'expected_data': ['username'],
        },
        {
            'Endpoint': 'api/notes/',
            'method': ['GET', 'POST'],
            'description': 'get all the notes of a particular logged in user, create a note for a paticular user',
            'expected_data': ['title', 'content'],
        },
        {
            'Endpoint': 'api/notes/<id>/',
            'method': ['GET', 'PUT', 'PATCH', 'DELETE'],
            'description': 'get the detail of a paticular note(id, title, content e.t.c), fully edit a particular note(title, content), edit a particular field of a note(title or content), delete a note',
            'expected_data': ['title', 'content'],
        },
        {
            'Endpoint': 'api/todos/',
            'method': ['GET', 'POST'],
            'description': 'get all todos of a particular logged in user, create a todo for a particular user',
            'expected_data': ['title', 'todoitems', 'due_date'],
        },
        {
            'Endpoint': 'api/todos/<id>/',
            'method': ['GET', 'PUT', 'PATCH', 'DELETE'],
            'description': 'get the detail of a paticular todo(id, title, todoitems e.t.c), fully edit a particular todo(title, todoitems, due_date), edit a particular field of a note(title or due_date, todoitems), delete a todo',
            'expected_data': ['title', 'todoitems', 'due_date'],
        },
        {
            'Endpoint': 'api/todoitems/?todo=<id>',
            'method': ['GET', 'POST'],
            'description': "get all todoitemss of a particular logged in user's specific todo, create a todoitem for a particular user's specific todo",
            'expected_data': ['title', 'todo', 'completed'],
        },
        {
            'Endpoint': 'api/todoitems/<id>/',
            'method': ['GET', 'PUT', 'PATCH', 'DELETE'],
            'description': 'get the detail of a paticular todoitem(id, todo, title e.t.c), fully edit a particular todoitem(title, todo, completed), edit a particular field of a note(title or completed), delete a todoitem',
            'expected_data': ['title', 'todo', 'completed'],
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


# get profile info
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile_info(request):
    try:
        username = request.data.get('username')
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({'error': "User not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = UserProfileInfoSerializer(user)
    return Response(serializer.data)


# List and Create Notes
class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)
     
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    


#  Retrive, update, and delete a Note
class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]


    def  get_queryset(self):
        return Note.objects.filter(user=self.request.user)
    
# List and Create Notes
class TodoListCreateView(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)
    
# Retrieve, Update & Delete a Todo
class TodoDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)  # Restrict access to user's todos
    

# List & Create Todo Items
class TodoItemListCreateView(generics.ListCreateAPIView):
    serializer_class = TodoItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        todo_id = self.request.query_params.get('todo')  # Get todo_id from query params
        print(todo_id)
        queryset = TodoItem.objects.filter(todo__user=self.request.user)  # Default: filter by user
        
        if todo_id:
            print('filtering by todo')
            queryset = queryset.filter(todo=todo_id)
        
        return queryset
    
    def perform_create(self, serializer):
        # Ensures the provided `todo_id` belongs to the logged-in user before saving.# 
        todo_id = self.request.query_params.get("todo")# Get `todo_id` from request params

        if not todo_id:
            raise ValidationError({"error": "Missing required parameter: 'todo'."})  # Ensure it's provided
        

        try:
            todo = Todo.objects.get(id=todo_id, user=self.request.user)  # Ensure user owns the Todo
        except Todo.DoesNotExist:
            raise ValidationError({"error": "Invalid or unauthorized todo ID."})  # Prevent unauthorized access

        serializer.save(todo=todo)  # Assign the todo instance before saving


# Retrieve, Update & Delete a TodoItem
class TodoItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return TodoItem.objects.filter(todo__user=self.request.user)  # Ensure only owner's todo items are accessible
