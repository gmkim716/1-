from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http.response import JsonResponse 		# JsonResponse 불러오기
from .models import Movie
from django.http import HttpResponse
import requests
from django.shortcuts import get_list_or_404
from rest_framework.response import Response
from .serializer import MovieListSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response


TMDB_API_KEY = "1894a2923867c8d04cf110591f18e4c0"

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def movie_list(request):
	if request.method == 'GET':
		movies = get_list_or_404(Movie)
		print('movies')
		print(movies)
		serializer = MovieListSerializer(movies, many=True)
		print('serializer')
		print(serializer)
		return Response(serializer.data)



# Create your views here.
def index(request):
	total_data = []
	data = requests.get(f'https://api.themoviedb.org/3/movie/popular?api_key={TMDB_API_KEY}&language=ko-KR&page={1}')
	movies = data.json()['results']
	for movie in movies:
		total_data.append(movie['title'])
	# for i in range(1, 5):
		# data = requests.get(f'https://api.themoviedb.org/3/movie/{i}?api_key={TMDB_API_KEY}&language=ko-KR')
		# movie = data.json()
		# total_data.append(movie['title'])
	# print(total_data)

	return render(request, 'movies/index.html')


def get_popular(request):
	popular_list = []

	# 참고: https://developers.themoviedb.org/3/movies/get-popular-movies
	data = requests.get(f'https://api.themoviedb.org/3/movie/popular?api_key={TMDB_API_KEY}&language=ko-KR&page={1}')			# 옵션: 한국어, 1 페이지 
	movies = data.json()['results']
	for movie in movies:
		popular_list.append(movie['title'])

	context = {
		'popular_list' : popular_list,
	}

	return render(request, 'movies/popular.html', context)

@api_view(['POST',])
def like(request, movie_pk):
	if request.user.is_authenticated:	# 요청한 유저가 권한이 있을 때 (로그인 되어 있을 때)
		movie = Movie.objects.get(pk=movie_pk)		# 영화 객체 선택
		
		# 영화의 장르에 대해 좋아요 표기를 원한다면 
		# genres = movie.genres.all()				
        # for g in genres:
        #     genre = Genre.objects.get(pk=g.pk)
        #     genre.like_users.add(request.user)

		# is_liked 데이터 변화
		if movie.like_users.filter(pk=request.user.pk).exists():		# 요청한 유저의 pk가 영화를 좋아한 사람들의 pk에 존재할 때: 이미 좋아요를 누른 경우, 클릭
			movie.like_users.remove(request.user)		
			is_liked = False
		else:										# 좋아요를 누른 적이 없는 유저가 좋아요를 누를 경우
			movie.like_users.add(request.user)	
			is_liked = True
		context = {
			'is_liked':is_liked,
			'movie_like_count': movie.like_users.count(),
		}
		return Response(context)
