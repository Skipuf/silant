from django.urls import path, include
from rest_framework import routers

from .views import MaintenanceView

router = routers.DefaultRouter()
router.register(r'maintenance', MaintenanceView)

urlpatterns = [
    path('', include(router.urls)),
]