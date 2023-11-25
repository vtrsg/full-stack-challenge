import re

from django.db import IntegrityError
from rest_framework import serializers, status, viewsets
from rest_framework.response import Response

from .models import Student
from .serializers import (
    CarSerializer,
    HelloSerializer,
    StudentSerializer,
    TextLinesSerializer,
)


class StudentViewSet(viewsets.ViewSet):
    serializer_class = StudentSerializer

    def get_queryset(self):
        return Student.objects.all()

    def calculate_average_grades(self, students):
        total_students = len(students)
        total_grades = sum(
            int(student.get('grade', 0)) for student in students
        )

        return (
            total_students,
            total_grades / total_students if total_students > 0 else None,
        )

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        total_students, average_grades = self.calculate_average_grades(
            serializer.data
        )

        return Response(
            {
                'total_students': total_students,
                'average_grades': float(format(average_grades, '.2f')),
            },
            status=status.HTTP_200_OK,
        )

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, many=isinstance(request.data, list)
        )
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            total_students, average_grades = self.calculate_average_grades(
                self.get_queryset().values()
            )

            return Response(
                {
                    'status': 'Success',
                    'total_students': total_students,
                    'average_grades': float(format(average_grades, '.2f')),
                },
                status=status.HTTP_201_CREATED,
            )
        except serializers.ValidationError as e:
            return Response(
                {
                    'status': 'Error',
                    'message': 'Mandatory fields not filled in or invalid values.',
                    'errors': e.detail,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        except IntegrityError as e:
            return Response(
                {
                    'status': 'Error',
                    'message': str(e),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class HelloViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk_name=None):
        serializer = HelloSerializer(data={'name': pk_name})
        try:
            serializer.is_valid(raise_exception=True)
            message = f'Hello, {serializer.validated_data["name"]}!'
            return Response(
                {
                    'status': 'Success',
                    'message': message,
                },
                status=status.HTTP_200_OK,
            )
        except serializers.ValidationError as e:
            return Response(
                {
                    'status': 'Error',
                    'message': 'Mandatory fields not filled in or invalid values.',
                    'errors': e.detail,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        except IntegrityError as e:
            return Response(
                {
                    'status': 'Error',
                    'message': str(e),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class Vehicle:
    def __init__(self, speed=0, acceleration=0):
        self.speed = speed
        self.acceleration = acceleration

    def accelerate(self):
        self.speed += self.acceleration


class CarViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk_speed=None, pk_acceleration=None):
        serializer = CarSerializer(
            data={'speed': pk_speed, 'acceleration': pk_acceleration}
        )
        try:
            serializer.is_valid(raise_exception=True)
            car = Vehicle(
                speed=serializer.validated_data['speed'],
                acceleration=serializer.validated_data['acceleration'],
            )
            car.accelerate()

            message = f'Speed = {car.speed}km/h'

            return Response(
                {
                    'status': 'Success',
                    'message': message,
                },
                status=status.HTTP_200_OK,
            )
        except serializers.ValidationError as e:
            return Response(
                {
                    'status': 'Error',
                    'message': 'Mandatory fields not filled in or invalid values.',
                    'errors': e.detail,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        except IntegrityError as e:
            return Response(
                {
                    'status': 'Error',
                    'message': str(e),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class TextLinesViewSet(viewsets.ViewSet):
    def break_text(self, text, words_min=15):
        text_without_newlines = re.sub(r'\s+', ' ', text)

        words = text_without_newlines.split()
        lines = []
        current_line = []

        for word in words:
            current_line.append(word)
            if len(current_line) >= words_min:
                lines.append(' '.join(current_line))
                current_line = []

        if current_line:
            lines.append(' '.join(current_line))

        return lines

    def create(self, request):
        text = request.data.get('text')

        if text is not None:
            serializer = TextLinesSerializer(data={'text': text})
        else:
            serializer = TextLinesSerializer(
                data={'text': request.FILES['file'].read().decode()}
            )

        try:
            serializer.is_valid(raise_exception=True)
            text = serializer.validated_data['text']
            lines = self.break_text(text, words_min=15)

            message = {'lines': lines}
            return Response(
                {
                    'status': 'Success',
                    'message': message,
                },
                status=status.HTTP_200_OK,
            )
        except serializers.ValidationError as e:
            return Response(
                {
                    'status': 'Error',
                    'message': 'Mandatory fields not filled in or invalid values.',
                    'errors': e.detail,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
