from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        GUEST = 'guest', 'Гость'
        CLIENT = 'client', 'Клиент'
        SERVICE = 'service', 'Сервисная организация'
        MANAGER = 'manager', 'Менеджер'

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.GUEST)

    def __str__(self):
        return f'{self.username} ({self.role})'
