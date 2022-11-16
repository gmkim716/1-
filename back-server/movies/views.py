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

	print(total_data)

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