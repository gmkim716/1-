from django.http import JsonResponse, HttpResponse
import requests
from .models import Genre, Movie, Actor

'''
- fixtures/movie.json 파일 생성
$ mkdir movies/fixtures
$ python -Xutf8 manage.py dumpdata movies --indent 4 > ./movies/fixtures/movies.json
$ python manage.py loaddata movies.json
'''

API_KEY = '1894a2923867c8d04cf110591f18e4c0'                # TMDB key
GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list'
POPULAR_MOVIE_URL = 'https://api.themoviedb.org/3/movie/popular'
NOWPLAYING_MOVIE_URL = 'https://api.themoviedb.org/3/movie/now_playing' 
UPCOMING_MOVIE_URL = 'https://api.themoviedb.org/3/movie/upcoming'
LATEST_MOVIE_URL = 'https://api.themoviedb.org/3/movie/latest'

id_list = []

# TMDB 장르 json 데이터 반환
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

# 유투브 키 가져오기
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

# 배우 목록 가져오기
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
        if movie.actors.count() == 3:       # 3명의 배우 정보만 저장
            break
 
# 영화 데이터 가져오기 # 11/16    
def movie_data(page=1):
    
    for url in [LATEST_MOVIE_URL, NOWPLAYING_MOVIE_URL, POPULAR_MOVIE_URL, UPCOMING_MOVIE_URL]:
        print('url:', url)
        response = requests.get(
        url,                  # api 종류별 사용
        params={
            'api_key': API_KEY,
            'language': 'ko-kr',     
            'page': page,       
        }
        ).json()
        if url == LATEST_MOVIE_URL:
            # 유투브 key 조회
            youtube_key = get_youtube_key(response)
                

            if not response.get('release_date'): continue   # 없는 필드 skip
            if not response.get('poster_path'): continue
            if not response.get('id'): continue
            if not response.get('overview'): continue
            if response.get('id') in id_list: continue
            id_list.append(response.get('id'))
                            
            movie = Movie.objects.create(
                id = response.get('id'),
                title = response.get('title'),
                release_date = response.get('release_date'),
                popularity = response.get('popularity'),
                vote_count = response.get('vote_count'),
                vote_average = response.get('vote_average'),
                overview = response.get('overview'),
                poster_path = response.get('poster_path'),   
                youtube_key = youtube_key         
            )

            for genre_id in response.get('genre_ids', []):
                movie.genres.add(genre_id)

            # 배우들 저장
            get_actors(movie)
            # print('>>>', movie.title, '==>', movie.youtube_key) 

        else:    
            for movie_dict in response.get('results'):
                if not movie_dict.get('release_date'): continue   # 없는 필드 skip
                if not movie_dict.get('poster_path'): continue
                if not movie_dict.get('id'): continue
                if movie_dict.get('id') in id_list: continue
                if not movie_dict.get('overview'): continue
                id_list.append(movie_dict.get('id'))
                print(id_list)  # 확인
                
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
                # print('>>>', movie.title, '==>', movie.youtube_key) 

'''
    # POPULAR_MOVIE_URL로부터 가져온 영화 데이터
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
        if not movie_dict.get('poster_path'): continue
        if not movie_dict.get('id'): continue
        if movie_dict.get('id') in id_list: continue
        id_list.append(movie_dict.get('id'))
        print(id_list)  # 확인
        
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
        # print('>>>', movie.title, '==>', movie.youtube_key)    
'''






# TMDB 데이터 가져오기
def tmdb_data(requests):
    # 기존 데이터가 있다면 초기화
    Genre.objects.all().delete()        
    Actor.objects.all().delete()
    Movie.objects.all().delete()

    tmdb_genres()
    global id_list          # 전역변수로 선언: 리스트- 영화 id를 담는 곳 
    for i in range(1, 35):       # 페이지 1~5 페이지 
        movie_data(i)

    return HttpResponse('OK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
