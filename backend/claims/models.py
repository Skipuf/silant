from django.db import models
from django.conf import settings

from machines.models import Machine
from handbook.models import HandbookModel

# Create your models here.
class Claim(models.Model):
    # Дата отказа
    failure_date = models.CharField(max_length=100)
    # Наработка, м/час
    operating_time = models.PositiveIntegerField()
    # Узел отказа
    failure_node = models.ForeignKey(HandbookModel,
                                     limit_choices_to={'type': 'FailureNode'},
                                     on_delete=models.CASCADE,
                                     related_name='failure_node')
    # Описание отказа
    failure_description = models.TextField()
    # Способ восстановления
    recovery_method = models.ForeignKey(HandbookModel,
                                        limit_choices_to={'type': 'RecoveryMethod'},
                                        on_delete=models.CASCADE,
                                        related_name='recovery_method')
    # Используемые запасные части
    spare_parts_used = models.TextField()
    # Дата восстановления
    recovery_date = models.CharField(max_length=100)
    # Время простоя техники
    downtime = models.CharField(max_length=100)
    # Сервисная компания
    service_company = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    # Машина
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE)