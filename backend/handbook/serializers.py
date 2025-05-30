from rest_framework import serializers

from .models import HandbookModel

class HandbookSerializer(serializers.ModelSerializer):
    class Meta:
        model = HandbookModel
        fields = ['id','type', 'name', 'description']

