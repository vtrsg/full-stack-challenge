from rest_framework import serializers
from rest_framework.validators import ValidationError

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


class HelloSerializer(serializers.Serializer):
    name = serializers.CharField()


class CarSerializer(serializers.Serializer):
    speed = serializers.IntegerField(required=True)
    acceleration = serializers.IntegerField(required=True)

    def validate(self, validated_data):
        speed = validated_data['speed']
        acceleration = validated_data['acceleration']

        if acceleration < 0:
            raise ValidationError('Send a valid value for acceleration.')

        if speed < 0:
            raise ValidationError('Send a valid value for speed.')

        return validated_data


class TextLinesSerializer(serializers.Serializer):
    text = serializers.CharField()

    def validate(self, validated_data):
        text = validated_data.get('text')
        if not text or not isinstance(text, str):
            raise ValidationError('Send a valid non-empty text.')
        return validated_data
