from django.urls import path

from .views import CarViewSet, HelloViewSet, StudentViewSet

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
    path(
        'car/speed/<pk_speed>/acceleration/<pk_acceleration>/',
        CarViewSet.as_view({'get': 'retrieve'}),
        name='car_speed',
    ),
]
