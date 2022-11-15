from django.urls import path
from . import views, views_tmdb

app_name='movies'
urlpatterns = [
    path('', views.index, name='index'),
    path('popular/', views.get_popular, name='popular'),
    path('tmdb/', views_tmdb.tmdb_data)
]
