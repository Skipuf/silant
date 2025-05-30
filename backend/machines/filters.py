import django_filters
from machines.models import Machine

class MachineFilter(django_filters.FilterSet):
    class Meta:
        model = Machine
        fields = {
            'machine_model': ['exact'],
            'engine_model': ['exact'],
            'transmission_model': ['exact'],
            'driving_axle_model': ['exact'],
            'steering_axle_model': ['exact'],
        }