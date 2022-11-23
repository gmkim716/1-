from django.urls import path
from . import views, views_tmdb

urlpatterns = [
    path('tmdb/', views_tmdb.tmdb_data),
    # path('get_youtube/', views.get_youtube),
    path('', views.movie_list),
    path('detail/<int:movie_pk>/', views.movie_detail),
    path('genres/<int:movie_pk>/', views.movie_genres),
    path('actors/<int:movie_pk>/', views.movie_actors),
    path('like/<int:movie_pk>/', views.like),
    path('watched/<int:movie_pk>/', views.watched),
    path('bookmarked/<int:movie_pk>/', views.bookmarked),
    path('<int:movie_pk>/reviews/', views.get_reviews),
    path('review/like/<int:review_pk>/', views.like_review),
    path('review/hate/<int:review_pk>/', views.hate_review),
    path('search/<str:query>/', views.search),
    path('searchEnter/<str:query>/', views.searchEnter ),
]