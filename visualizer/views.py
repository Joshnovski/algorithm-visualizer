from django.shortcuts import render
from django.http import JsonResponse
# from rest_framework import generics
# from .serializers import AlgorithmsSerializer

from .models import Algorithms

# Create your views here.
def index(request):
    return JsonResponse({"message": "Post created successfully."}, status=201)