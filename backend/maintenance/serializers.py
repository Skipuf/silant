from rest_framework import serializers

from users.serializers import UserSerializer
from machines.serializers import MachineShortSerializer

from maintenance.models import Maintenance
from handbook.serializers import HandbookSerializer



class MaintenanceSerializer(serializers.ModelSerializer):
    maintenance_type = HandbookSerializer(read_only=True)
    service_company = UserSerializer(read_only=True)
    machine = MachineShortSerializer(read_only=True)

    class Meta:
        model = Maintenance
        fields = [
            'id',
            'maintenance_type',
            'maintenance_date',
            'operating_time',
            'order_number',
            'order_date',
            'service_company',
            'machine',
        ]



