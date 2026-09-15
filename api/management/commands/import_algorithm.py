import os
from django.core.management.base import BaseCommand
from api.models import Algorithms


class Command(BaseCommand):
    help = (
        "Imports every Algorithms/**/<Name>.js (with its <Name>.md description) into the "
        "database. Existing rows with the same name are updated."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--prune",
            action="store_true",
            help="Delete database rows whose .js file no longer exists.",
        )

    def handle(self, *args, **options):
        root = os.path.normpath(
            os.path.join(os.path.dirname(__file__), "..", "..", "..", "Algorithms")
        )
        imported_names = set()

        for dirpath, _directories, files in os.walk(root):
            for filename in sorted(files):
                if not filename.endswith(".js"):
                    continue

                js_file_path = os.path.join(dirpath, filename)
                md_file_path = js_file_path[:-3] + ".md"
                algorithm_name = filename[:-3]

                try:
                    with open(js_file_path, "r", encoding="utf-8") as js_file:
                        code_content = js_file.read()
                except OSError as exc:
                    self.stdout.write(self.style.ERROR(f"Could not read {js_file_path}: {exc}"))
                    continue

                try:
                    with open(md_file_path, "r", encoding="utf-8") as md_file:
                        description = md_file.read()
                except FileNotFoundError:
                    self.stdout.write(
                        self.style.WARNING(f"No description found for {algorithm_name} (expected {md_file_path})")
                    )
                    description = ""

                _algorithm, created = Algorithms.objects.update_or_create(
                    name=algorithm_name,
                    defaults={"description": description, "code": code_content},
                )
                imported_names.add(algorithm_name)
                verb = "Added" if created else "Updated"
                self.stdout.write(self.style.SUCCESS(f"{verb} {algorithm_name}"))

        if options["prune"]:
            stale = Algorithms.objects.exclude(name__in=imported_names)
            for algorithm in stale:
                self.stdout.write(self.style.WARNING(f"Removed {algorithm.name} (no matching file)"))
            stale.delete()

        self.stdout.write(f"{len(imported_names)} algorithm(s) imported from {root}")
