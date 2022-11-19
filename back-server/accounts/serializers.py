from rest_framework import serializers
from django.contrib.auth import get_user_model
# from movies.models import Movie, Review


# class ReviewSerializer(serializers.ModelSerializer):
#     username = serializers.CharField(source='user.username', read_only=True)
    
#     class Meta:
#         model = Review
#         fields = '__all__'
#         read_only_fields = ('movie','user')

# class Movieserializer(serializers.ModelSerializer):
#     review_set = ReviewSerializer(many=True, read_only=True)
#     review_count = serializers.IntegerField(source='review_set.count', read_only=True)
#     like_users_count = serializers.IntegerField(source='like_users.count', read_only=True)

#     class Meta:
#         model = Movie
#         fields = '__all__'

class CustomUserSerializer(serializers.ModelSerializer):
    like_movies_count = serializers.IntegerField(source='like_movies.count', read_only=True)


    class Meta:
        model = get_user_model()
        fields = '__all__'