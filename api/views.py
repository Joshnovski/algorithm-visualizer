from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AlgorithmsSerializer
from django.http import JsonResponse, HttpResponse
from .models import Algorithms

# Create your views here.
def index(request):
    return JsonResponse({"message": "Post created successfully."}, status=201)

class AlgorithmsViewSet(viewsets.ModelViewSet):
    queryset = Algorithms.objects.all()
    serializer_class = AlgorithmsSerializer 