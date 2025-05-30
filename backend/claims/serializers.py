from rest_framework import serializers
from claims.models import Claim
from machines.serializers import MachineShortSerializer
from handbook.serializers import HandbookSerializer
from users.serializers import UserSerializer


class ClaimSerializer(serializers.ModelSerializer):
    failure_node = HandbookSerializer(read_only=True)
    recovery_method = HandbookSerializer(read_only=True)

    service_company = UserSerializer(read_only=True)
    machine = MachineShortSerializer(read_only=True)

    class Meta:
        model = Claim
        fields = [
            'id',
            'failure_date',
            'operating_time',
            'failure_node',
            'failure_description',
            'recovery_method',
            'spare_parts_used',
            'recovery_date',
            'downtime',
            'service_company',
            'machine'
        ]
