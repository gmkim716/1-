from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.http import require_POST


# 팔로우 기능 - POST 요청만 허용
@require_POST
def follow(request, user_pk):
    if request.user.is_authenticated:           # 요청한 사용자가 로그인되어 있을 때 
        person = get_object_or_404(get_user_model(), pk=user_pk)    # pk=user_pk인 유저 정보를 가져옴
        user = request.user                                         # user = 요청한 사용자
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
                'following_sount': person.followeings.count(),
            }
            return JsonResponse(context)