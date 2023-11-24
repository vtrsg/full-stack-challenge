from django.db import IntegrityError
from rest_framework import serializers, status, viewsets
from rest_framework.response import Response

from .models import Student
from .serializers import CarSerializer, HelloSerializer, StudentSerializer


class StudentViewSet(viewsets.ViewSet):
    serializer_class = StudentSerializer

    def get_queryset(self):
        return Student.objects.all()

    def calculate_average_grades(self, students):
        total_students = len(students)
        total_grades = sum(
            student['grade'] for student in students if 'grade' in student
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
        response_data = serializer.data + [
            {
                'total_students': total_students,
                'average_grades': float(format(average_grades, '.2f')),
            }
        ]

        return Response(response_data)

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, many=isinstance(request.data, list)
        )
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(
                {
                    'status': 'Success',
                    'message': 'Created successfully.',
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


class CarViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk_speed=None, pk_acceleration=None):
        serializer = CarSerializer(
            data={'speed': pk_speed, 'acceleration': pk_acceleration}
        )
        try:
            serializer.is_valid(raise_exception=True)
            acceleration = serializer.validated_data['acceleration']
            speed = serializer.validated_data['speed'] + acceleration
            message = f'Full speed = {speed}km/h'

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
