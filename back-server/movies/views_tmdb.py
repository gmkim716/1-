from django.http import JsonResponse, HttpResponse
import requests
from .models import Genre, Movie, Actor

'''
- fixtures/movie.json 파일 생성
$ mkdir movies/fixtures
$ python -Xutf8 manage.py dumpdata movies --indent 4 > ./movies/fixtures/movies.json
'''


API_KEY = '1894a2923867c8d04cf110591f18e4c0'                # TMDB key
GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list'
POPULAR_MOVIE_URL = 'https://api.themoviedb.org/3/movie/popular'

def tmdb_genres():
    response = requests.get(            # 해당 URL로부터 params로 요청을 보내 json 데이터를 얻어오기
        GENRE_URL,
        params={
            'api_key': API_KEY,
            'language': 'ko-KR',            
        }
    ).json()   
    for genre in response.get('genres'):            # 각각의 genre에 대해 id를 생성 
        if Genre.objects.filter(pk=genre['id']).exists(): continue        
        print('genre:', genre)
        Genre.objects.create(           # id가 없을 경우, genre의 id, name 설정
            id=genre['id'],
            name=genre['name']
        )
    return JsonResponse(response)       # json 데이터를 반환


def get_youtube_key(movie_dict):    
    movie_id = movie_dict.get('id')
    response = requests.get(           # 해당 URL로부터 params로 요청을 보내 json 데이터를 얻어오기             
        f'https://api.themoviedb.org/3/movie/{movie_id}/videos',
        params={
            'api_key': API_KEY
        }
    ).json()
    for video in response.get('results'):           # results 데이터로부터 가져온 각각의 video에 대해 
        if video.get('site') == 'YouTube':          # site 속성이 YouTube인 경우
            return video.get('key')                 # key를 반환
    return 'nothing'                  # 해당이 없는 경우 

def get_actors(movie):
    movie_id = movie.id
    response = requests.get(
        f'https://api.themoviedb.org/3/movie/{movie_id}/credits',
        params={
            'api_key': API_KEY,
            'language': 'ko-kr',
        }
    ).json()
    
    for person in response.get('cast'):         # 'cast'로부터 가져온 각각의 person에 대해 
        if person.get('known_for_department') != 'Acting': continue     # 연기부일 경우, 건너뜀
        actor_id = person.get('id')     
        if not Actor.objects.filter(pk=actor_id).exists():      # actor_id변수가 존재하지 않을 경우,
            actor = Actor.objects.create(                       # actor 인스턴스를 생성하고, id, name을 부여 
                id=person.get('id'),
                name=person.get('name')
            )
        movie.actors.add(actor_id)          # artors에 추가    
        if movie.actors.count() == 5:       # 5명의 배우 정보만 저장
            break

def movie_data(page=1):
    response = requests.get(
        POPULAR_MOVIE_URL,                  # popular api 사용
        params={
            'api_key': API_KEY,
            'language': 'ko-kr',     
            'page': page,       
        }
    ).json()

    for movie_dict in response.get('results'):
        if not movie_dict.get('release_date'): continue   # 없는 필드 skip
        # 유투브 key 조회
        youtube_key = get_youtube_key(movie_dict)

        movie = Movie.objects.create(
            id = movie_dict.get('id'),
            title = movie_dict.get('title'),
            release_date = movie_dict.get('release_date'),
            popularity = movie_dict.get('popularity'),
            vote_count = movie_dict.get('vote_count'),
            vote_average = movie_dict.get('vote_average'),
            overview = movie_dict.get('overview'),
            poster_path = movie_dict.get('poster_path'),   
            youtube_key = youtube_key         
        )
        for genre_id in movie_dict.get('genre_ids', []):
            movie.genres.add(genre_id)

        # 배우들 저장
        get_actors(movie)
        print('>>>', movie.title, '==>', movie.youtube_key)    


def tmdb_data(request):
    Genre.objects.all().delete()
    Actor.objects.all().delete()
    Movie.objects.all().delete()

    tmdb_genres()
    for i in range(1, 6):
        movie_data(i)
    return HttpResponse('OK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
