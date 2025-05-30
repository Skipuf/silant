from django.db import models

# Create your models here.
class HandbookModel(models.Model):
    TYPE_CHOICES = [
        ('MachineModel', 'Модель техники'),
        ('EngineModel', 'Модель двигателя'),
        ('TransmissionModel', 'Модель трансмиссии'),
        ('DrivingAxleModel', 'Модель ведущего моста'),
        ('SteeringAxleModel', 'Модель управляемого моста'),
        ('MaintenanceType', 'Вид ТО'),
        ('FailureNode', 'Узел отказа'),
        ('RecoveryMethod', 'Способ восстановления'),
    ]

    type = models.CharField(
        max_length=17,
        choices=TYPE_CHOICES,
        default='MachineModel',
    )

    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)