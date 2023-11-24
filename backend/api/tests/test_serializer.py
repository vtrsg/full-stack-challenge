import pytest

from ..models import Student
from ..serializers import StudentSerializer


@pytest.mark.django_db
def test_create_single_student():
    serializer = StudentSerializer()

    data = {'name': 'Student4', 'email': 'Student4@example.com', 'grade': 9.5}

    created_students = serializer.create(data)

    assert isinstance(created_students, Student)

    assert created_students.name == 'Student4'
    assert created_students.email == 'Student4@example.com'
    assert created_students.grade == 9.5


@pytest.mark.django_db
def test_create_multiple_students():
    serializer = StudentSerializer()

    data_list = [
        {'name': 'Student5', 'email': 'Student5@example.com', 'grade': 8.5},
        {'name': 'Student6', 'email': 'Student6@example.com', 'grade': 9.0},
    ]

    created_students = serializer.create(data_list)

    assert isinstance(created_students, list)
    assert all(isinstance(student[0], Student) for student in created_students)
