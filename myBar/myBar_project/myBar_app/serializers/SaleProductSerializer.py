from rest_framework import serializers

from myBar_project.myBar_app.models import Sale
from myBar_project.myBar_app.serializers.saleSerializer import SaleSerializer


class SaleProductSerializer(serializers.ModelSerializer):
    sale = SaleSerializer(read_only=True)
    sale_id = serializers.SlugRelatedField(queryset=Sale.sales.all(), slug_field='sale', write_only=True)

    class Meta:
        model = Sale
        fields = ['sale', 'sale_id']