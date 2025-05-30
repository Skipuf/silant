from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from drf_yasg.utils import swagger_auto_schema

from users.permissions import IsManager, IsManagerOrClientOrService
from .models import HandbookModel
from .serializers import HandbookSerializer


class HandbookViews(ModelViewSet):
    queryset = HandbookModel.objects.all()
    serializer_class = HandbookSerializer
    permission_classes = [IsManager]

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['type']

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsManagerOrClientOrService()]
        if self.request.method in ['POST', 'PATCH', 'PUT', 'DELETE']:
            return [IsManager()]
        return [IsAuthenticated()]

    @swagger_auto_schema(operation_description="Получить список записей")
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Создать новую запись")
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Получить запись по ID")
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Обновить запись")
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Частично обновить запись")
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(operation_description="Удалить запись")
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

