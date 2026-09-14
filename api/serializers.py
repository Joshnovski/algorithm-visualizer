from rest_framework import serializers
from .models import Algorithms

class AlgorithmsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Algorithms
        fields = '__all__'