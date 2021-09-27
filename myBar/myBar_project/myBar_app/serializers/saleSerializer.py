from rest_framework import serializers

from rest_framework import serializers

from ..models.sale import Sale


class SaleSerializer(serializers.Serializer):

    sale_id = serializers.IntegerField()
    creation_date = serializers.CharField(max_length=200)

    class Meta:
        model = Sale
        fields = '__all__'