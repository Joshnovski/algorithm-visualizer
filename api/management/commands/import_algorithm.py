import os
from django.core.management.base import BaseCommand
from api.models import Algorithms

class Command(BaseCommand):
    help = 'Imports a JavaScript file containing an algorithm into the database'

    def handle(self, *args, **kwargs):
        
        root = os.path.join(
            os.path.dirname(__file__),
            '../../../Algorithms/'
        )

        for paths, directories, files in os.walk(root):
            for file in files:
                # Filter by code files
                if file.endswith('.js'):
                    # Get the file path
                    js_file_path = os.path.join(paths, file)
                    md_file_path = js_file_path.replace('.js', '.md')
                    # Get the name from file name
                    algorithm_name = file.replace('.js', '')
                    # Read the file and save its contents to the database
                    try:
                        with open(js_file_path, 'r', encoding='utf-8') as file:
                            code_content = file.read()

                        with open(md_file_path, 'r', encoding='utf-8') as file:
                            description = file.read()

                        # Create or update the Algorithm instance
                        algorithm, created = Algorithms.objects.update_or_create(
                            name=algorithm_name, 
                            defaults={'description':description, 'code':code_content}
                        )
                        
                        if created:
                            msg = f'Successfully added {algorithm_name} to database.'
                        else:
                            msg = f'Successfully updated {algorithm_name} in database.'

                        self.stdout.write(self.style.SUCCESS(msg))
                    except FileNotFoundError:
                        self.stdout.write(self.style.ERROR(f'File not found: {file}'))