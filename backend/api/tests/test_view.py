import pytest
from rest_framework import status
from rest_framework.test import APIRequestFactory

from ..models import Student
from ..views import CarViewSet, HelloViewSet, StudentViewSet


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


@pytest.mark.django_db
class TestHelloViewSet:
    def test_retrieve_hello_success(self, rf):
        viewset = HelloViewSet()
        pk_name = 'Vittorio'
        request = rf.get(f'/api/hello/{pk_name}/')
        response = viewset.retrieve(request, pk_name=pk_name)

        assert response.status_code == status.HTTP_200_OK
        assert 'status' in response.data
        assert response.data['status'] == 'Success'
        assert 'message' in response.data
        assert response.data['message'] == f'Hello, {pk_name}!'


@pytest.mark.django_db
class TestCarViewSet:
    def test_retrieve_car_success(self, rf):
        viewset = CarViewSet()
        pk_speed = 60
        pk_acceleration = 20
        request = rf.get(
            f'/api/car/speed/{pk_speed}/acceleration/{pk_acceleration}/'
        )
        response = viewset.retrieve(
            request, pk_speed=pk_speed, pk_acceleration=pk_acceleration
        )

        assert response.status_code == status.HTTP_200_OK
        assert 'status' in response.data
        assert response.data['status'] == 'Success'
        assert 'message' in response.data
        assert (
            response.data['message']
            == f'Full speed = {pk_speed + pk_acceleration}km/h'
        )

    def test_retrieve_car_invalid_input(self, rf):
        viewset = CarViewSet()
        pk_speed = 'NaN'
        pk_acceleration = -10
        request = rf.get(
            f'/api/car/speed/{pk_speed}/acceleration/{pk_acceleration}/'
        )
        response = viewset.retrieve(
            request, pk_speed=pk_speed, pk_acceleration=pk_acceleration
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'status' in response.data
        assert response.data['status'] == 'Error'
        assert 'message' in response.data
        assert 'errors' in response.data
        assert 'speed' in response.data['errors']

    def test_retrieve_car_negative_acceleration(self, rf):
        viewset = CarViewSet()
        pk_speed = 60
        pk_acceleration = -10
        request = rf.get(
            f'/api/car/speed/{pk_speed}/acceleration/{pk_acceleration}/'
        )
        response = viewset.retrieve(
            request, pk_speed=pk_speed, pk_acceleration=pk_acceleration
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'status' in response.data
        assert response.data['status'] == 'Error'
        assert 'message' in response.data
        assert 'errors' in response.data

    def test_retrieve_car_negative_speed(self, rf):
        viewset = CarViewSet()
        pk_speed = -60
        pk_acceleration = 10
        request = rf.get(
            f'/api/car/speed/{pk_speed}/acceleration/{pk_acceleration}/'
        )
        response = viewset.retrieve(
            request, pk_speed=pk_speed, pk_acceleration=pk_acceleration
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'status' in response.data
        assert response.data['status'] == 'Error'
        assert 'message' in response.data
        assert 'errors' in response.data
