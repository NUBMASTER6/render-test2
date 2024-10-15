from django.urls import path
from .views import *

urlpatterns = [
    path('login/', login, name='login'),
    path('sms-validation/', sms_validation, name='sms-validation'),
    path('signup/', signup, name='signup'),
    path('signup-success/', signup_success, name='signup-success'),
]
