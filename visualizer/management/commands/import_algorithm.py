import os
from django.core.management.base import BaseCommand
from visualizer.models import Algorithms

class Command(BaseCommand):
    help = 'Imports a JavaScript file containing an algorithm into the database'

    def handle(self, *args, **kwargs):
        # Construct the file path of the .js file and the .md file
        
        file_path = os.path.join(
            os.path.dirname(__file__),
            '../../../Algorithms/NonLinearDataStructures/Graphs/DirectedGraphs/Traversal/BreadthFirstSearch/BreadthFirstSearchDirectedGraphs.js'
        )

        # Read the file and save its contents to the database
        try:
            with open(file_path, 'r') as file:
                code_content = file.read()

            print(file_path)
            # Create or update the Algorithm instance
            algorithm = Algorithms(name='Breadth First Search', description='Your Algorithm Description', code="Hello World")
            algorithm.save()

            self.stdout.write(self.style.SUCCESS('Successfully imported algorithm code'))
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR('File not found.'))
