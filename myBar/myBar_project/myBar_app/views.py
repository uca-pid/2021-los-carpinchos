from django.shortcuts import render

# Create your views here.
from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.views import View

from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse

#from .parser import *

from .models import Mb_user
from . import models

def index(request):
    return HttpResponse("API myBar.")

@api_view(['POST'])
def user_create(request):
    try:
        user = Mb_user(**request.data)
        user.save()
        return Response(status=status.HTTP_201_CREATED)
    except Exception as e:
        if str(e) == "El usuario ya existe":
            return Response(status = status.HTTP_409_CONFLICT)
        else:
            return Response(status = status.HTTP_400_BAD_REQUEST)