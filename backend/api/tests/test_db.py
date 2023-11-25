import pytest
from pytest import mark

from ..models import Student


@pytest.fixture(autouse=True)
def student_data():
    student_data = Student.objects.create(
        name='test student',
        email='test@teststudent.com',
        grade=9.10,
    )

    return student_data


@mark.django_db
def test_create_student(student_data):
    student = student_data

    assert student.name == 'test student'
    assert student.email == 'test@teststudent.com'
    assert student.grade == 9.10
    assert str(student) == 'test student'
