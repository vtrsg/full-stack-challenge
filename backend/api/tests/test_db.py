from pytest import mark


@mark.django_db
def test_create_student(student_data):
    student = student_data

    assert student.name == 'test student'
    assert student.email == 'test@teststudent.com'
    assert student.grade == 9.10
    assert str(student) == 'test student'
