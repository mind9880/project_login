from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from auth_app.views import (
    AdminRegisterView, AdminLoginAPI, TeacherLoginAPI, StudentLoginAPI,
    teacher_classrooms, all_classrooms, ForgotPasswordView,
    CreateTeacherView, AddStudentView
)
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

urlpatterns = [
    # Admin Registration and Login
    path('AdminRegister/', AdminRegisterView.as_view(), name='AdminRegister'),
    path('AdminLogin/', AdminLoginAPI.as_view(), name='AdminLogin'),
      # Create Teacher
    path('CreateTeacher/', CreateTeacherView.as_view(), name='CreateTeacher'),


    # Teacher Login
    path('TeacherLogin/', TeacherLoginAPI.as_view(), name='TeacherLogin'),

    # Student Login
    path('token-auth/', obtain_auth_token, name='token_auth'), 
    path('AddStudent/', AddStudentView.as_view(), name='AddStudent'),
    path('teacher-classrooms/', teacher_classrooms, name='teacher-classrooms'),
    path('allclassrooms/', all_classrooms, name='allclassrooms'),
    path('StudentLogin/', StudentLoginAPI.as_view(), name='StudentLogin'),
  
    
    # Forgot Password
    path('ForgotPassword/', ForgotPasswordView.as_view(), name='ForgotPassword'),

    # # JWT Token Authentication
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]