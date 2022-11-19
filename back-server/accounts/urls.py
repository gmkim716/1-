from django.urls import path
from . import views

urlpatterns = [
    path('', views.user_detail),
    path('follow/', views.follow)
]
