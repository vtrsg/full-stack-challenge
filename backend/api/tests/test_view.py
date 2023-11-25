import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
from rest_framework.test import APIClient, APIRequestFactory

from ..models import Student
from ..views import CarViewSet, HelloViewSet, StudentViewSet, TextLinesViewSet

client = APIClient()


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

        assert response.status_code == status.HTTP_200_OK
        assert 'total_students' in response.data
        assert 'average_grades' in response.data

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
            == f'Speed = {pk_speed + pk_acceleration}km/h'
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


@pytest.mark.django_db
class TestTextLinesViewSet:
    def test_create_with_text(self):
        data = {'text': 'This is a sample text with more than 15 words.'}
        response = client.post('/api/text/lines/', data)
        assert response.status_code == status.HTTP_200_OK
        assert response.json()['status'] == 'Success'
        assert 'lines' in response.json()['message']

    def test_create_with_file(self):
        file_content = 'This is a sample text with more than 15 words.'
        uploaded_file = SimpleUploadedFile('test.txt', file_content.encode())
        data = {'file': uploaded_file}
        response = client.post('/api/text/lines/', data, format='multipart')
        assert response.status_code == status.HTTP_200_OK
        assert response.json()['status'] == 'Success'
        assert 'lines' in response.json()['message']

    def test_break_text_method(self):
        viewset = TextLinesViewSet()
        text = 'This is a sample text with more than 15 words.'
        lines = viewset.break_text(text, words_min=5)
        assert lines
        assert len(lines) == 2
