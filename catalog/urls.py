from django.urls import path
from .views import *

urlpatterns = [
    path('catalog/', catalog, name='catalog'),
    path('catalog-all/', catalog_all, name='catalog-all'),
    path('catalog/<str:pk>/', catalog_specific, name='catalog')
]
