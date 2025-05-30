from django.db import models
from django.conf import settings

from handbook.models import HandbookModel


class Machine(models.Model):
    # Зав. № машины
    serial_number_machine = models.CharField(max_length=100, unique=True)
    # Модель техники
    machine_model = models.ForeignKey(HandbookModel,
                                      limit_choices_to={'type': 'MachineModel'},
                                      on_delete=models.CASCADE,
                                      related_name='machine_model')
    # Модель двигателя
    engine_model = models.ForeignKey(HandbookModel,
                                     limit_choices_to={'type': 'EngineModel'},
                                     on_delete=models.CASCADE,
                                     related_name='engine_model')
    # Зав. № двигателя
    serial_number_engine = models.CharField(max_length=100, unique=True)
    # Модель трансмиссии
    transmission_model = models.ForeignKey(HandbookModel,
                                           limit_choices_to={'type': 'TransmissionModel'},
                                           on_delete=models.CASCADE,
                                           related_name='transmission_model')
    # Зав. № трансмиссии
    serial_number_transmission = models.CharField(max_length=100, unique=True)
    # Модель ведущего моста
    driving_axle_model = models.ForeignKey(HandbookModel,
                                           limit_choices_to={'type': 'DrivingAxleModel'},
                                           on_delete=models.CASCADE,
                                           related_name='driving_axle_model')
    # Зав. № ведущего моста
    serial_number_driving_axle = models.CharField(max_length=100, unique=True)
    # Модель управляемого моста
    steering_axle_model = models.ForeignKey(HandbookModel,
                                            limit_choices_to={'type': 'SteeringAxleModel'},
                                            on_delete=models.CASCADE,
                                            related_name='steering_axle_model')
    # Зав. № управляемого моста
    serial_number_steering_axle = models.CharField(max_length=100, unique=True)
    # Договор поставки №, дата
    supply_contract = models.CharField(max_length=200, unique=True, blank=True, null=True)
    # Дата отгрузки с завода
    shipment_date_factory = models.DateField(blank=True, null=True)
    # Грузополучатель (конечный потребитель)
    consignee = models.CharField(max_length=200, blank=True, null=True)
    # Адрес поставки (эксплуатации)
    delivery_address = models.TextField(blank=True, null=True)
    # Комплектация (доп. опции)
    equipment_options = models.TextField(blank=True, null=True)
    # Клиент
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='client_machines')
    # Сервисная компания
    service_company = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)