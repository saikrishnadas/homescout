from django.urls import path
from .views import PropertyList,FilterPropertiesAPIView,PropertyDetailsAPIView,PropertyCreateAPIView,PropertyDeleteAPIView,PropertyUpdateAPIView

urlpatterns = [
    path("properties",PropertyList.as_view(),name="property-list"),
    path("properties/filter/",FilterPropertiesAPIView.as_view(),name="filter-properties"),
    path("properties/create/",PropertyCreateAPIView.as_view(),name="property-create"),
    path("properties/delete/<int:property_id>/",PropertyDeleteAPIView.as_view(),name="property-delete"),
    path("properties/update/<int:property_id>/",PropertyUpdateAPIView.as_view(),name="property-update"),
    path("properties/<int:property_id>/",PropertyDetailsAPIView.as_view(),name="property-detail"),
]