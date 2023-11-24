from django.urls import path

from .views import StudentViewSet

app_name = 'api'

urlpatterns = [
    path(
        'students/',
        StudentViewSet.as_view({'post': 'create', 'get': 'list'}),
        name='student',
    ),
]
