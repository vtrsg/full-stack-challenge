import pytest

from api.models import Student


@pytest.fixture(autouse=True)
def student_data():
    student_data = Student.objects.create(
        name='test student',
        email='test@teststudent.com',
        grade=9.10,
    )

    return student_data
