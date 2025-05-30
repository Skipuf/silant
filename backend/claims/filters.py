import django_filters
from claims.models import Claim

class ClaimFilter(django_filters.FilterSet):
    serial_number_machine = django_filters.CharFilter(
        field_name='machine__serial_number_machine',
        lookup_expr='icontains'
    )

    class Meta:
        model = Claim
        fields = {
            'failure_node': ['exact'],
            'recovery_method': ['exact'],
            'service_company': ['exact'],
            'machine': ['exact'],
        }
