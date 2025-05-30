from django.urls import path, include
from rest_framework import routers

from .views import ClaimView

router = routers.DefaultRouter()
router.register(r'claim', ClaimView)

urlpatterns = [
    path('', include(router.urls)),
]