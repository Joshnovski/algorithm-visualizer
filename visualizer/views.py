from django.shortcuts import render
# from rest_framework import generics
# from .serializers import AlgorithmsSerializer

from .models import Algorithms

# Create your views here.
def index(request):
    return render(request, 'visualizer/index.html')