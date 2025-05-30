from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.filters import OrderingFilter
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from handbook.models import HandbookModel
from users.models import User
from users.permissions import IsManager, IsManagerOrClientOrService
from .filters import MachineFilter
from .models import Machine
from .serializers import MachinesSerializer, GuestMachineSerializer


class MachinesView(ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachinesSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = MachineFilter
    ordering_fields = ['shipment_date_factory']
    ordering = ['-shipment_date_factory']

    def get_queryset(self):
        user = self.request.user

        if not user.is_authenticated:
            return Machine.objects.none()

        if user.role == 'client':
            return Machine.objects.filter(client=user)
        elif user.role == 'service':
            return Machine.objects.filter(service_company=user)
        elif user.role == 'manager':
            return Machine.objects.all()

        return Machine.objects.none()

    def get_permissions(self):
        if self.action == 'lookup':
            return [AllowAny()]
        if self.request.method == 'GET':
            return [IsManagerOrClientOrService()]
        if self.request.method in ['POST', 'PATCH', 'PUT', 'DELETE']:
            return [IsManager()]
        return [IsAuthenticated()]

    def perform_update(self, serializer):
        user = self.request.user
        service_company = None
        client = None
        if self.request.data.get('service_company'):
            service_company = get_object_or_404(User, pk=self.request.data.get('service_company'))
        if self.request.data.get('client'):
            client = get_object_or_404(User, pk=self.request.data.get('client'))

        if user.role != 'manager':
            raise PermissionDenied('Вы не менеджер')

        if self.request.data.get('machine_model') == 'Новый':
            name = self.request.data.get('machine_model_name')
            description = self.request.data.get('machine_model_description', '')
            machine_model = HandbookModel.objects.create(
                type='MachineModel',
                name=name,
                description=description
            )
        else:
            machine_model = get_object_or_404(HandbookModel, pk=self.request.data.get('machine_model'))

        if self.request.data.get('engine_model') == 'Новый':
            name = self.request.data.get('engine_model_name')
            description = self.request.data.get('engine_model_description', '')
            engine_model = HandbookModel.objects.create(
                type='EngineModel',
                name=name,
                description=description
            )
        else:
            engine_model = get_object_or_404(HandbookModel, pk=self.request.data.get('engine_model'))

        if self.request.data.get('transmission_model') == 'Новый':
            name = self.request.data.get('transmission_model_name')
            description = self.request.data.get('transmission_model_description', '')
            transmission_model = HandbookModel.objects.create(
                type='TransmissionModel',
                name=name,
                description=description
            )
        else:
            transmission_model = get_object_or_404(HandbookModel, pk=self.request.data.get('transmission_model'))

        if self.request.data.get('driving_axle_model') == 'Новый':
            name = self.request.data.get('driving_axle_model_name')
            description = self.request.data.get('driving_axle_model_description', '')
            driving_axle_model = HandbookModel.objects.create(
                type='DrivingAxleModel',
                name=name,
                description=description
            )
        else:
            driving_axle_model = get_object_or_404(HandbookModel, pk=self.request.data.get('driving_axle_model'))

        if self.request.data.get('steering_axle_model') == 'Новый':
            name = self.request.data.get('steering_axle_model_name')
            description = self.request.data.get('steering_axle_model_description', '')
            steering_axle_model = HandbookModel.objects.create(
                type='SteeringAxleModel',
                name=name,
                description=description
            )
        else:
            steering_axle_model = get_object_or_404(HandbookModel, pk=self.request.data.get('steering_axle_model'))

        serializer.save(machine_model=machine_model,
                        engine_model=engine_model,
                        transmission_model=transmission_model,
                        driving_axle_model=driving_axle_model,
                        steering_axle_model=steering_axle_model,
                        client=client,
                        service_company=service_company)

    def perform_create(self, serializer):
        user = self.request.user
        service_company = None
        client = None
        if self.request.data.get('service_company'):
            service_company = get_object_or_404(User, pk=self.request.data.get('service_company'))
        if self.request.data.get('client'):
            client = get_object_or_404(User, pk=self.request.data.get('client'))

        if user.role != 'manager':
            raise PermissionDenied('Вы не менеджер')

        if self.request.data.get('machine_model') == 'Новый':
            name = self.request.data.get('machine_model_name')
            description = self.request.data.get('machine_model_description', '')
            machine_model = HandbookModel.objects.create(
                type='MachineModel',
                name=name,
                description=description
            )
        else:
            machine_model = get_object_or_404(HandbookModel, pk=self.request.data.get('machine_model'))

        if self.request.data.get('engine_model') == 'Новый':
            name = self.request.data.get('engine_model_name')
            description = self.request.data.get('engine_model_description', '')
            engine_model = HandbookModel.objects.create(
                type='EngineModel',
                name=name,
                description=description
            )
        else:
            engine_model = get_object_or_404(HandbookModel, pk=self.request.data.get('engine_model'))

        if self.request.data.get('transmission_model') == 'Новый':
            name = self.request.data.get('transmission_model_name')
            description = self.request.data.get('transmission_model_description', '')
            transmission_model = HandbookModel.objects.create(
                type='TransmissionModel',
                name=name,
                description=description
            )
        else:
            transmission_model = get_object_or_404(HandbookModel, pk=self.request.data.get('transmission_model'))

        if self.request.data.get('driving_axle_model') == 'Новый':
            name = self.request.data.get('driving_axle_model_name')
            description = self.request.data.get('driving_axle_model_description', '')
            driving_axle_model = HandbookModel.objects.create(
                type='DrivingAxleModel',
                name=name,
                description=description
            )
        else:
            driving_axle_model = get_object_or_404(HandbookModel, pk=self.request.data.get('driving_axle_model'))

        if self.request.data.get('steering_axle_model') == 'Новый':
            name = self.request.data.get('steering_axle_model_name')
            description = self.request.data.get('steering_axle_model_description', '')
            steering_axle_model = HandbookModel.objects.create(
                type='SteeringAxleModel',
                name=name,
                description=description
            )
        else:
            steering_axle_model = get_object_or_404(HandbookModel, pk=self.request.data.get('steering_axle_model'))

        serializer.save(machine_model=machine_model,
                        engine_model=engine_model,
                        transmission_model=transmission_model,
                        driving_axle_model=driving_axle_model,
                        steering_axle_model=steering_axle_model,
                        client=client,
                        service_company=service_company)

    @swagger_auto_schema(
        operation_description="Получить машину по заводскому номеру (гостевой доступ).",
        manual_parameters=[
            openapi.Parameter(
                name='serial',
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                required=True,
                description='Заводской номер машины'
            ),
        ]
    )
    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def lookup(self, request):
        serial = request.query_params.get('serial')
        machine = get_object_or_404(Machine, serial_number_machine=serial)

        serializer = GuestMachineSerializer(machine)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description="Получить список машин с фильтрацией и сортировкой.",
        manual_parameters=[
            openapi.Parameter('machine_model', openapi.IN_QUERY, description='ID модели техники', type=openapi.TYPE_INTEGER),
            openapi.Parameter('engine_model', openapi.IN_QUERY, description='ID модели двигателя', type=openapi.TYPE_INTEGER),
            openapi.Parameter('transmission_model', openapi.IN_QUERY, description='ID модели трансмиссии', type=openapi.TYPE_INTEGER),
            openapi.Parameter('driving_axle_model', openapi.IN_QUERY, description='ID ведущего моста', type=openapi.TYPE_INTEGER),
            openapi.Parameter('steering_axle_model', openapi.IN_QUERY, description='ID управляемого моста', type=openapi.TYPE_INTEGER),
            openapi.Parameter('serial_number_machine', openapi.IN_QUERY, description='Поиск по номеру машины (частично)', type=openapi.TYPE_STRING),
            openapi.Parameter('service_company', openapi.IN_QUERY, description='ID сервисной компании', type=openapi.TYPE_INTEGER),
            openapi.Parameter('client', openapi.IN_QUERY, description='ID клиента', type=openapi.TYPE_INTEGER),
            openapi.Parameter('ordering', openapi.IN_QUERY, description='Сортировка (пример: -shipment_date_factory)', type=openapi.TYPE_STRING),
        ]
    )
    def list(self, request, *args, **kwargs):
        """
        Получить список машин с фильтрацией и сортировкой.
        """
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Создать новую машину (только менеджер)."
    )
    def create(self, request, *args, **kwargs):
        """
        Создать новую машину.
        """
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Получить данные конкретной машины по ID."
    )
    def retrieve(self, request, *args, **kwargs):
        """
        Получить машину по ID.
        """
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Обновить все поля машины (только менеджер)."
    )
    def update(self, request, *args, **kwargs):
        """
        Полное обновление машины.
        """
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Частично обновить поля машины (только менеджер)."
    )
    def partial_update(self, request, *args, **kwargs):
        """
        Частичное обновление машины.
        """
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Удалить машину из системы (только менеджер)."
    )
    def destroy(self, request, *args, **kwargs):
        """
        Удаление машины.
        """
        return super().destroy(request, *args, **kwargs)
