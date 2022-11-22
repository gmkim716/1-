from rest_framework import serializers
from django.contrib.auth import get_user_model
from movies.models import Movie, Genre, Actor

class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ('name',)

class ActorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Actor
        fields = ('name',)

class Movieserializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True)
    actors = ActorSerializer(many=True)

    class Meta:
        model = Movie
        fields = ('title', 'poster_path', 'genres', 'actors', 'release_date', 'vote_count')


class CustomUserSerializer(serializers.ModelSerializer):
    like_movies_count = serializers.IntegerField(source='like_movies.count', read_only=True)
    watched_movies_count = serializers.IntegerField(source='watched_movies.count', read_only=True)
    # like_movies = Movieserializer(many=True)

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name', 'date_joined', 'followings','followers', 'like_movies','like_movies_count', 'watched_movies', 'watched_movies_count')