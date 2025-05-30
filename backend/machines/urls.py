from django.urls import path, include
from rest_framework import routers

from .views import MachinesView

router = routers.DefaultRouter()
router.register(r'machines', MachinesView)

urlpatterns = [
    path('', include(router.urls)),
]