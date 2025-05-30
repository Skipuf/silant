from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.exceptions import PermissionDenied
from rest_framework.filters import OrderingFilter
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from machines.models import Machine
from handbook.models import HandbookModel
from users.models import User
from users.permissions import IsManager, IsClientOrService, IsManagerOrClientOrService
from .models import Maintenance
from .serializers import MaintenanceSerializer
from .filters import MaintenanceFilter


class MaintenanceView(ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = MaintenanceFilter
    ordering_fields = ['order_date']
    ordering = ['-order_date']

    def get_queryset(self):
        user = self.request.user

        if not user.is_authenticated:
            return Maintenance.objects.none()

        if user.role == 'client':
            return Maintenance.objects.filter(machine__client=user)
        elif user.role == 'service':
            return Maintenance.objects.filter(service_company=user)
        elif user.role == 'manager':
            return Maintenance.objects.all()

        return Maintenance.objects.none()

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsManagerOrClientOrService()]
        if self.request.method == 'POST':
            return [IsManagerOrClientOrService()]
        if self.request.method in ['PATCH', 'PUT', 'DELETE']:
            return [IsManager()]
        return [IsAuthenticated()]

    def perform_update(self, serializer):
        user = self.request.user
        machine = get_object_or_404(Machine, pk=self.request.data.get('machine'))

        if self.request.data.get('service_company'):
            service_company = get_object_or_404(User, pk=self.request.data.get('service_company'))
            if service_company.role != 'service':
                service_company = machine.client
        else:
            service_company = None

        if user.role != 'manager':
            raise PermissionDenied('Вы не менеджер')

        if self.request.data.get('maintenance_type') == 'Новый':
            name = self.request.data.get('maintenance_type_name')
            description = self.request.data.get('maintenance_type_description', '')
            maintenance_type = HandbookModel.objects.create(
                type='MaintenanceType',
                name=name,
                description=description
            )
        else:
            maintenance_type = get_object_or_404(HandbookModel, pk=self.request.data.get('maintenance_type'))

        serializer.save(maintenance_type=maintenance_type, service_company=service_company)

    def perform_create(self, serializer):
        user = self.request.user
        service_company = get_object_or_404(User, pk=self.request.data.get('service_company'))
        machine = get_object_or_404(Machine, pk=self.request.data.get('machine'))

        if user.role == 'client' and machine.client != user:
            raise PermissionDenied('Вы не владелец этой машины')
        if user.role == 'service' and machine.service_company != user:
            raise PermissionDenied('Эта машина не обслуживается вашей компанией')

        if service_company.role != 'service':
            service_company = machine.client

        if self.request.data.get('maintenance_type') == 'Новый':
            name = self.request.data.get('maintenance_type_name')
            description = self.request.data.get('maintenance_type_description', '')
            maintenance_type = HandbookModel.objects.create(
                type='MaintenanceType',
                name=name,
                description=description
            )
        else:
            maintenance_type = get_object_or_404(HandbookModel, pk=self.request.data.get('maintenance_type'))

        serializer.save(maintenance_type=maintenance_type, machine=machine, service_company=service_company)

    @swagger_auto_schema(
        operation_description="Получить список ТО с фильтрацией и сортировкой.",
        manual_parameters=[
            openapi.Parameter('machine', openapi.IN_QUERY, description='ID машины', type=openapi.TYPE_INTEGER),
            openapi.Parameter('maintenance_type', openapi.IN_QUERY, description='Вид ТО', type=openapi.TYPE_INTEGER),
            openapi.Parameter('service_company', openapi.IN_QUERY, description='ID сервисной компании', type=openapi.TYPE_INTEGER),
            openapi.Parameter('ordering', openapi.IN_QUERY, description='Сортировка по дате проведения ТО', type=openapi.TYPE_STRING),
        ]
    )
    def list(self, request, *args, **kwargs):
        """
        Получить список записей технического обслуживания с возможностью фильтрации.
        """
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Создать запись о проведённом ТО (клиент или сервисная организация).")
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Получить запись ТО по ID.")
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Обновить все поля записи ТО (только менеджер).")
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Частично обновить запись ТО (только менеджер).")
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Удалить запись ТО (только менеджер).")
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
