from rest_framework import serializers
from django.contrib.auth import get_user_model

class CustomUserSerializer(serializers.ModelSerializer):
    like_movies_count = serializers.IntegerField(source='like_movies.count', read_only=True)


    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name', 'date_joined', 'followings','followers', 'like_movies_count',)