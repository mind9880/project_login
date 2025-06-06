
from django.shortcuts import render, redirect
# Create your views here.
from django.contrib.auth import authenticate , login
from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from auth_app.serializers import UserSerializer , TeacherSerializer , StudentCreateSerializer , ClassroomDropdownSerializer
from rest_framework import generics, permissions
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import CustomUser, Teacher, ClassRoom, Student
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authtoken.models import Token
from auth_app.models import CustomUser , ClassRoom
from rest_framework.generics import ListAPIView, CreateAPIView
from django.contrib.auth import authenticate , get_user_model
from rest_framework import serializers
from rest_framework.authentication import TokenAuthentication



User = get_user_model()

class AdminRegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        # Check if user already exists
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

        # Create new admin user
        user = CustomUser(
        username=username,
        email=email,
        role='admin',
        is_staff=True,
    )
        user.set_password(password)
        user.save()
        return Response({'success': True, 'message': 'Admin registered successfully'}, status=status.HTTP_201_CREATED)

class AdminLoginAPI(APIView):
     
     def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")
        print(f"Username: {username}, Password: {password}")

        user = authenticate(username=username, password=password)
        print(f"User: {user}")

        if user is not None and user.is_staff:
            return Response({"success": True, "message": "Admin login successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, "message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
   

class CreateTeacherView(generics.CreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [permissions.AllowAny] 

    def post(self, request):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()

                return Response({"message": "Teacher created successfully"}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            print(f"Error during teacher creation: {e}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TeacherLoginAPI(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None and hasattr(user, 'role'):
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "success": True,
                "message": "Teacher login successful",
                "token": token.key,
                "username": user.username
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "success": False,
                "message": "Invalid credentials or not a teacher"
            }, status=status.HTTP_401_UNAUTHORIZED)

class AddStudentView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = StudentCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Student created successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def teacher_classrooms(request):
    try:
        teacher = Teacher.objects.get(user=request.user)
    except Teacher.DoesNotExist:
        return Response([], status=200)

    if teacher.role != 'class_teacher' or not teacher.assigned_classes.exists():
        return Response([], status=200)

    serializer = ClassroomDropdownSerializer(teacher.assigned_classes.all(), many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_classrooms(request):
    from .models import ClassRoom
    classrooms = ClassRoom.objects.all()
    serializer = ClassroomDropdownSerializer(classrooms, many=True)
    return Response(serializer.data)

# For dropdown serialization

class ClassroomDropdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRoom
        fields = ['id', 'name']



class StudentLoginAPI(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        print(f"Username: {username}, Password: {password}")

        user = authenticate(username=username, password=password)
       
        if user is not None and hasattr(user, 'role') :
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "success": True,
                "message": "student login successful",
                "token": token.key,
                "username": user.username
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "success": False,
                "message": "Invalid credentials or not a student"
            }, status=status.HTTP_401_UNAUTHORIZED)
       


class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
            new_password = get_random_string(length=10)
            user.set_password(new_password)
            user.save()
            send_mail(
                'Password Reset',
                f'Your new password is {new_password}',
                'from@example.com',
                [email],
                fail_silently=False,
            )
            return Response({'message': 'Password reset email sent'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Email not found'}, status=status.HTTP_400_BAD_REQUEST)