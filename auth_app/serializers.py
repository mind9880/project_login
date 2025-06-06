from django.conf import settings 
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import CustomUser, Teacher, ClassRoom, Student
from django.contrib.auth.hashers import make_password
from django.db import transaction


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }

        def create(self, validated_data):
            password = validated_data.pop('password')
            user = User(**validated_data)
            user.set_password(password)
            user.save()
            return user

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Teacher
        fields = ['id', 'user', 'name', 'email', 'role', 'assigned_classes', 'subject']

    def create(self, validated_data):
        user_data = validated_data.pop('user')

        # Create user (with password hashing)
        user = CustomUser.objects.create_user(**user_data)

        # Handle many-to-many manually
        assigned_classes = validated_data.pop('assigned_classes', [])

        teacher = Teacher.objects.create(user=user, **validated_data)
        teacher.assigned_classes.set(assigned_classes)

        return teacher
    

class ClassroomDropdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRoom
        fields = ['id', 'name']  
    


class StudentCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)
    date_of_birth = serializers.DateField(required=True)
    gender = serializers.ChoiceField(choices=[('M', 'Male'), ('F', 'Female')], required=True)
    address = serializers.CharField(required=True)
    parent_contact = serializers.CharField(required=True)
    student_class = serializers.IntegerField(required=True)

    class Meta:
        model = Student
        fields = [
            'username', 'email', 'password', 'date_of_birth', 'gender',
            'address', 'parent_contact', 'student_class'
        ]

    def create(self, validated_data):
        with transaction.atomic():
            user = User.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password']
            )
            student = Student.objects.create(
                user=user,
                date_of_birth=validated_data['date_of_birth'],
                gender=validated_data['gender'],
                address=validated_data['address'],
                parent_contact=validated_data['parent_contact'],
                student_class_id=validated_data['student_class']
            )
        return student