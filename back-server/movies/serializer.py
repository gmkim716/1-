from rest_framework import serializers
from .models import Movie, Review


class MovieListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'
        # fields = ('id', 'title', 'content')
        # fields = ('id', 'title', 'content', 'user', 'username')

class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('movie','user')

class Movieserializer(serializers.ModelSerializer):
    review_set = ReviewSerializer(many=True, read_only=True)
    review_count = serializers.IntegerField(source='review_set.count', read_only=True)
    like_users_count = serializers.IntegerField(source='like_users.count', read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'

# class ReviewSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Review
#         fields = '__all__'
#         read_only_fields = ('movie',)


# class MovieSerializer(serializers.ModelSerializer):
#     # comment_set = CommentSerializer(many=True, read_only=True)
#     # comment_count = serializers.IntegerField(source='comment_set.count', read_only=True)
#     username = serializers.CharField(source='user.username', read_only=True)

#     class Meta:
#         model = Movie
#         fields = '__all__'
#         read_only_fields = ('user', )

