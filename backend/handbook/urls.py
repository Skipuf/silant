from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import HandbookViews

router = DefaultRouter()
router.register(r'handbook', HandbookViews)

urlpatterns = [
    path('', include(router.urls)),
]
