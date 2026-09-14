from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AlgorithmsViewSet, index

router = DefaultRouter()
router.register(r'algorithms', AlgorithmsViewSet)

urlpatterns = [
    path('index/', index, name='index'),
    path('', include(router.urls)),
]