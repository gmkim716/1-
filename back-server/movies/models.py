from django.db import models
from django.conf import settings

class Genre(models.Model):
	name = models.CharField(max_length=50)          # 장르 명

class Actor(models.Model):
    name = models.CharField(max_length=50)          # 배우 명 
	
class Movie(models.Model):
	title = models.CharField(max_length=100)		# 제목
	release_date = models.DateField()			    # 개봉일
	popularity = models.FloatField()				# 인기도
	vote_count = models.IntegerField()				# 투표 수 
	vote_average = models.FloatField() 				# 투표 점수(?)
	overview = models.TextField()					# 개요
	poster_path = models.CharField(max_length=200)	# 포스터 url 경로
	youtube_key = models.CharField(max_length=200)	# 유투브 키
	genres = models.ManyToManyField(Genre)		                         # 장르, Genre와 MtoM
	like_users = models.ManyToManyField(settings.AUTH_USER_MODEL)		# 좋아요(?), MtoM
	actors = models.ManyToManyField(Actor)		    # 배우, Actor와 MtoM

class Review(models.Model):
	content = models.TextField()
	rating = models.IntegerField()
	movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='review_like')
	hate_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='review_hate')