import django_filters
from maintenance.models import Maintenance

class MaintenanceFilter(django_filters.FilterSet):
    serial_number_machine = django_filters.CharFilter(
        field_name='machine__serial_number_machine',
        lookup_expr='icontains'
    )

    class Meta:
        model = Maintenance
        fields = {
            'maintenance_type': ['exact'],
            'service_company': ['exact'],
            'machine': ['exact'],
        }
