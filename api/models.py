from django.db import models

# Create your models here.
class Algorithms(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    code = models.TextField()

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "code": self.code
        }