# from django.db import models
# from django.contrib.auth.models import AbstractUser ,User
# from django.contrib.auth.hashers import make_password
# from django.conf import settings


# class CustomUser(AbstractUser):
#     """
#     Custom user model that extends the default User model. 
#     Adds a role for users: Admin, Teacher, Student.
#     """
#     ROLE_CHOICES = (
#         ('admin', 'Admin'),
#         ('teacher', 'Teacher'),
#         ('class_teacher', 'Class Teacher'),
#         ('subject_teacher', 'Subject Teacher'),
#         ('student', 'Student'),
#     )

#     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)  # Temporarily nullable
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    
#     def __str__(self):
#         return f"{self.user.username} - {self.role}"

#     # Define related_name to avoid clashes
#     groups = models.ManyToManyField(
#         'auth.Group',
#         related_name='customuser_groups',
#         blank=True,
#         help_text='The groups this user belongs to.',
#         verbose_name='groups'
#     )

#     user_permissions = models.ManyToManyField(
#         'auth.Permission',
#         related_name='customuser_permissions',
#         blank=True,
#         help_text='Specific permissions for this user.',
#         verbose_name='user permissions'
#     )

#     def __str__(self):
#         return self.username

#     def save(self, *args, **kwargs):
#         if self.role == 'admin':
#             self.is_staff = True
#         elif self.role == 'teacher':
#             self.is_staff = False
#         elif self.role == 'student':
#             self.is_staff = False

#         super(CustomUser, self).save(*args, **kwargs)



# # -------------------------------
# # 2. ClassRoom Model (renamed from Class)
# # -------------------------------

# class ClassRoom(models.Model):
#     name = models.CharField(max_length=100, unique=True)  # e.g., "Class 4"
#     description = models.TextField(null=True, blank=True)

#     def __str__(self):
#         return self.name



# class UserProfile(models.Model):

#     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     bio = models.TextField(null=True, blank=True)
#     profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
#     class_assigned = models.ForeignKey(ClassRoom, null=True, blank=True, on_delete=models.SET_NULL, related_name='students')

#     def __str__(self):
#         return f"Profile of {self.user.username}"


# def create_admin_user():
#     # Create a superuser if none exists
#     if not CustomUser.objects.filter(username='admin').exists():
#         admin = CustomUser.objects.create_superuser(
#             username='admin',
#             email='admin@example.com',
#             password='adminpassword'
#         )
#         admin.role = 'admin'
#         admin.save()
#         print("Admin user created.")

# class Teacher(models.Model):
#     ROLE_CHOICES = [
#         ('teacher', 'Subject Teacher'),
#         ('class_teacher', 'Class Teacher'),
#     ]
#     name = models.CharField(max_length=100)
#     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES)
#     assigned_classes = models.ManyToManyField(ClassRoom, blank=True)
#     subject = models.CharField(max_length=100, blank=True, null=True)


#     def __str__(self):
#         return f"{self.user.username} - {self.subject or self.role}"


# GENDER_CHOICES = (
#     ('M', 'Male'),
#     ('F', 'Female'),
#     ('O', 'Other'),
# )

# class Student(models.Model):
    
#     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     # user = models.OneToOneField(User, on_delete=models.CASCADE)
#     date_of_birth = models.DateField()
#     gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
#     address = models.TextField()
#     parent_contact = models.CharField(max_length=20)
#     student_class = models.ForeignKey(ClassRoom, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.user.get_full_name() or self.user.username

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


# -------------------------------
# 1. Custom User Model
# -------------------------------

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('teacher', 'Teacher'),
        ('class_teacher', 'Class Teacher'),
        ('subject_teacher', 'Subject Teacher'),
        ('student', 'Student'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if self.role == 'admin':
            self.is_staff = True
        elif self.role in ['teacher', 'student', 'class_teacher', 'subject_teacher']:
            self.is_staff = False
        super().save(*args, **kwargs)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_groups',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups'
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions'
    )


# -------------------------------
# 2. ClassRoom Model
# -------------------------------

class ClassRoom(models.Model):
    name = models.CharField(max_length=100, unique=True)  # e.g., "Class 4"
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


# -------------------------------
# 3. Profile Model (Unified)
# -------------------------------

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    assigned_class = models.ForeignKey(ClassRoom, null=True, blank=True, on_delete=models.SET_NULL)
    bio = models.TextField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)

    def __str__(self):
        return f"Profile of {self.user.username}"


# -------------------------------
# 4. Teacher Model
# -------------------------------

class Teacher(models.Model):
    ROLE_CHOICES = [
        ('teacher', 'Subject Teacher'),
        ('class_teacher', 'Class Teacher'),
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    assigned_classes = models.ManyToManyField(ClassRoom, blank=True)
    subject = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.subject or self.role}"


# -------------------------------
# 5. Student Model
# -------------------------------

GENDER_CHOICES = (
    ('M', 'Male'),
    ('F', 'Female'),
    ('O', 'Other'),
)

class Student(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    address = models.TextField()
    parent_contact = models.CharField(max_length=20)
    student_class = models.ForeignKey(ClassRoom, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.get_full_name() or self.user.username


# -------------------------------
# 6. Optional: Admin Bootstrap Script
# -------------------------------

def create_admin_user():
    from django.contrib.auth import get_user_model
    User = get_user_model()
    if not User.objects.filter(username='admin').exists():
        admin = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='adminpassword'
        )
        admin.role = 'admin'
        admin.save()
        print("Admin user created.")

    