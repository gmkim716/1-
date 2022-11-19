from django.shortcuts import get_object_or_404, get_list_or_404
from django.contrib.auth import get_user_model
from django.views.decorators.http import require_POST
from rest_framework.decorators import api_view
from .serializers import CustomUserSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from django.http import JsonResponse 

@api_view(['GET', ])
@permission_classes([IsAuthenticatedOrReadOnly])
def user_detail(request, user_pk):
    user = get_object_or_404(get_user_model(), pk=user_pk)
    if request.method == 'GET':
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)


# 팔로우 기능 - POST 요청만 허용
@api_view(['POST', ])
@permission_classes([IsAuthenticated])
def follow(request, user_pk):
    if request.user.is_authenticated:           # 요청한 사용자가 로그인되어 있을 때 
        person = get_object_or_404(get_user_model(), pk=user_pk)    # pk=user_pk인 유저 정보를 가져옴
        user = request.user                                        # user = 요청한 사용자
        if person != user:                                          # 가져온 사용자와 요청한 사용자가 다를 때
            if person.followers.filter(pk=user.pk).exists():   
                person.followers.remove(user)
                is_followed = False
            else:
                person.followers.add(user)
                is_followed = True
            context = {
                'is_followed': is_followed,
                'followers_count': person.followers.count(),
                'following_count': person.followings.count(),
            }
            return Response(context)