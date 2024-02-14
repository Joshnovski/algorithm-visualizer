import os
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import Algorithms

# Create your views here.
def index(request):
    return JsonResponse({"message": "Post created successfully."}, status=201)

# Get preset algorithm file data then send to database
def get_algorithm_files(request):
    file_path = os.path.join(
        os.path.dirname(__file__),  # Gets the directory of `views.py`
        '..',  # Moves up to the `visualizer` directory
        '..',  # Moves up to the root directory of the project
        'Algorithms', 'NonLinearDataStructures', 'Graphs', 'DirectedGraphs', 'Traversal', 'BreadthFirstSearch', 'BreadthFirstSearchDirectedGraphs.js'
    )
    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            file_data = file.read()
            # Save the file data to the database
            print(file_path)
            # algorithm = Algorithms(name='Your Algorithm Name', code=code_content)
            # algorithm.save()

            return HttpResponse("Correctly got file path.")
    else: 
        return HttpResponse("File path does not exist.")