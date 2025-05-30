from rest_framework import serializers

from handbook.serializers import HandbookSerializer
from users.serializers import UserSerializer

from .models import Machine


class MachinesSerializer(serializers.ModelSerializer):
    client = UserSerializer(read_only=True)
    machine_model = HandbookSerializer(read_only=True)
    engine_model = HandbookSerializer(read_only=True)
    transmission_model = HandbookSerializer(read_only=True)
    driving_axle_model = HandbookSerializer(read_only=True)
    steering_axle_model = HandbookSerializer(read_only=True)
    service_company = UserSerializer(read_only=True)

    class Meta:
        model = Machine
        fields = [
            'id',
            'serial_number_machine',
            'machine_model',
            'engine_model',
            'transmission_model',
            'driving_axle_model',
            'steering_axle_model',
            'serial_number_engine',
            'serial_number_transmission',
            'serial_number_driving_axle',
            'serial_number_steering_axle',
            'supply_contract',
            'shipment_date_factory',
            'consignee',
            'delivery_address',
            'equipment_options',
            'client',
            'service_company',
        ]


class GuestMachineSerializer(serializers.ModelSerializer):
    machine_model = HandbookSerializer(read_only=True)
    engine_model = HandbookSerializer(read_only=True)
    transmission_model = HandbookSerializer(read_only=True)
    driving_axle_model = HandbookSerializer(read_only=True)
    steering_axle_model = HandbookSerializer(read_only=True)

    class Meta:
        model = Machine
        fields = [
            'serial_number_machine',
            'machine_model',
            'engine_model',
            'serial_number_engine',
            'transmission_model',
            'serial_number_transmission',
            'driving_axle_model',
            'serial_number_driving_axle',
            'steering_axle_model',
            'serial_number_steering_axle',
        ]


class MachineShortSerializer(serializers.ModelSerializer):
    client = UserSerializer(read_only=True)
    service_company = UserSerializer(read_only=True)

    class Meta:
        model = Machine
        fields = ['id', 'serial_number_machine', 'client',
            'service_company']