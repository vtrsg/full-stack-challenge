from rest_framework import serializers

from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

    def create(self, validated_data):
        if isinstance(validated_data, list):
            students = []
            for item in validated_data:
                student = Student.objects.update_or_create(
                    email=item['email'], defaults=item
                )
                students.append(student)
            return students
        else:
            return Student.objects.update_or_create(
                email=validated_data['email'], defaults=validated_data
            )[0]
