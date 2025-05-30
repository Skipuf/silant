from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.exceptions import PermissionDenied
from rest_framework.filters import OrderingFilter
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from users.permissions import IsManager, IsManagerOrClientOrService, IsManagerOrService

from machines.models import Machine
from handbook.models import HandbookModel
from .models import Claim

from .serializers import ClaimSerializer

from .filters import ClaimFilter


class ClaimView(ModelViewSet):
    queryset = Claim.objects.all()
    serializer_class = ClaimSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = ClaimFilter
    ordering_fields = ['failure_date']
    ordering = ['-failure_date']

    def get_queryset(self):
        user = self.request.user

        if not user.is_authenticated:
            return Claim.objects.none()

        if user.role == 'client':
            return Claim.objects.filter(machine__client=user)
        elif user.role == 'service':
            return Claim.objects.filter(service_company=user)
        elif user.role == 'manager':
            return Claim.objects.all()

        return Claim.objects.none()

    def perform_update(self, serializer):
        user = self.request.user

        if user.role != 'manager':
            raise PermissionDenied('Вы не менеджер')

        if self.request.data.get('failure_node') == 'Новый':
            name = self.request.data.get('failure_node_name')
            description = self.request.data.get('failure_node_description', '')
            failure_node = HandbookModel.objects.create(
                type='FailureNode',
                name=name,
                description=description
            )
        else:
            failure_node = get_object_or_404(HandbookModel, pk=self.request.data.get('failure_node'))

        if self.request.data.get('recovery_method') == 'Новый':
            name = self.request.data.get('recovery_method_name')
            description = self.request.data.get('recovery_method_description', '')
            recovery_method = HandbookModel.objects.create(
                type='RecoveryMethod',
                name=name,
                description=description
            )
        else:
            recovery_method = get_object_or_404(HandbookModel, pk=self.request.data.get('recovery_method'))

        serializer.save(failure_node=failure_node, recovery_method=recovery_method)

    def perform_create(self, serializer):
        user = self.request.user

        machine = get_object_or_404(Machine, pk=self.request.data.get('machine'))
        service_company = machine.service_company

        if user.role == 'service' and machine.service_company != user:
            raise PermissionDenied('Эта машина не обслуживается вашей компанией')

        if self.request.data.get('failure_node') == 'Новый':
            name = self.request.data.get('failure_node_name')
            description = self.request.data.get('failure_node_description', '')
            failure_node = HandbookModel.objects.create(
                type='FailureNode',
                name=name,
                description=description
            )
        else:
            failure_node = get_object_or_404(HandbookModel, pk=self.request.data.get('failure_node'))

        if self.request.data.get('recovery_method') == 'Новый':
            name = self.request.data.get('recovery_method_name')
            description = self.request.data.get('recovery_method_description', '')
            recovery_method = HandbookModel.objects.create(
                type='RecoveryMethod',
                name=name,
                description=description
            )
        else:
            recovery_method = get_object_or_404(HandbookModel, pk=self.request.data.get('recovery_method'))

        # Сохраняем основной объект, передав свежесозданный maintenance_type
        serializer.save(failure_node=failure_node, recovery_method=recovery_method, machine=machine, service_company=service_company)

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsManagerOrClientOrService()]
        if self.request.method == 'POST':
            return [IsManagerOrService()]
        if self.request.method in ['PATCH', 'PUT', 'DELETE']:
            return [IsManager()]
        return [IsAuthenticated()]

    @swagger_auto_schema(
        operation_description="Получить список рекламаций с фильтрацией и сортировкой.",
        manual_parameters=[
            openapi.Parameter('machine', openapi.IN_QUERY, description='ID машины', type=openapi.TYPE_INTEGER),
            openapi.Parameter('failure_node', openapi.IN_QUERY, description='ID узла отказа', type=openapi.TYPE_INTEGER),
            openapi.Parameter('recovery_method', openapi.IN_QUERY, description='ID способа восстановления', type=openapi.TYPE_INTEGER),
            openapi.Parameter('service_company', openapi.IN_QUERY, description='ID сервисной компании', type=openapi.TYPE_INTEGER),
            openapi.Parameter('ordering', openapi.IN_QUERY, description='Сортировка по дате отказа', type=openapi.TYPE_STRING),
        ]
    )
    def list(self, request, *args, **kwargs):
        """
        Получить список рекламаций с возможностью фильтрации.
        """
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Создать рекламацию (только сервисная организация).")
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Получить рекламацию по ID.")
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Обновить все поля рекламации (только менеджер).")
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Частично обновить рекламацию (только менеджер).")
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Удалить рекламацию (только менеджер).")
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
