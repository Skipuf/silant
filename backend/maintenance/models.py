from django.db import models
from django.conf import settings

from machines.models import Machine
from handbook.models import HandbookModel

# Create your models here.
class Maintenance(models.Model):
    # Вид ТО
    maintenance_type = models.ForeignKey(HandbookModel,
                                         limit_choices_to={'type': 'MaintenanceType'},
                                         on_delete=models.CASCADE,
                                         related_name='maintenance_type')
    # Дата проведения ТО
    maintenance_date = models.DateField()
    # Наработка, м/час
    operating_time = models.PositiveIntegerField()
    # № заказ-наряда
    order_number = models.CharField(max_length=100)
    # Дата заказ-наряда
    order_date = models.DateField()
    # Сервисная компания
    service_company = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    # Машина
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE)