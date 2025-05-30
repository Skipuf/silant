from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer, UserCreateSerializer
from .permissions import IsManager

class UserViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet
):
    """
    GET /users/        — список (фильтрация по ?role=)
    POST /users/       — создание нового пользователя
    """
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated, IsManager]

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        role = self.request.query_params.get('role')
        if role:
            qs = qs.filter(role=role)
        return qs

    @action(detail=False, methods=['get'], url_path='',
            permission_classes=[IsAuthenticated])
    def me(self, request):
        """
        GET /users/me/  — возвращает self.request.user
        """
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
