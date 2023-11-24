import pytest
from rest_framework import status
from rest_framework.test import APIRequestFactory

from ..models import Student
from ..views import StudentViewSet


@pytest.fixture
def request_func():
    factory = APIRequestFactory()
    request = factory.get('/api/students/')
    return request


@pytest.mark.django_db
class TestStudentViewSet:
    def test_list_students(self, request_func):
        Student.objects.create(
            name='Student1', email='Student1@example.com', grade=8.5
        )
        Student.objects.create(
            name='Student2', email='Student2@example.com', grade=9.0
        )

        viewset = StudentViewSet()
        response = viewset.list(request_func)
        last_item = response.data[-1]

        assert response.status_code == status.HTTP_200_OK
        assert 'total_students' in last_item
        assert 'average_grades' in last_item

    def test_create_student_success(self, request_func):
        viewset = StudentViewSet()
        data = {
            'name': 'Student3',
            'email': 'Student3@example.com',
            'grade': 9.5,
        }

        request = request_func
        request.data = data
        response = viewset.create(request)

        assert response.status_code == status.HTTP_201_CREATED

    def test_create_student_invalid_data(self, request_func):
        viewset = StudentViewSet()
        data = {
            'name': 'Invalid Student',
            'email': 'invalidemail',
            'grade': 'NaN',
        }

        request = request_func
        request.data = data
        response = viewset.create(request)

        assert response.status_code == status.HTTP_400_BAD_REQUEST
