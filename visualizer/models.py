from django.db import models

# Create your models here.
class Algorithms(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    code = models.TextField()

    def __str__(self):
        return self.name