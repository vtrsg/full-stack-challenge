from django.urls import path

from .views import HelloViewSet, StudentViewSet

app_name = 'api'

urlpatterns = [
    path(
        'students/',
        StudentViewSet.as_view({'post': 'create', 'get': 'list'}),
        name='student',
    ),
    path(
        'hello/<pk_name>/',
        HelloViewSet.as_view({'get': 'retrieve'}),
        name='hello',
    ),
]
