from django.db import models
from django.contrib.auth.models import AbstractUser
from movies.models import Movie, Review


# Create your models here.
class User(AbstractUser):
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    ## 이부분 매니투매니가 여러개 되나? => 된다!
    like_movies = models.ManyToManyField(Movie)