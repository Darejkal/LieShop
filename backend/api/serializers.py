from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     password = serializers.CharField(
#     write_only=True,
#     required=True,
#     help_text='Leave empty if no change needed',
#     style={'input_type': 'password', 'placeholder': 'Password'}
#     )
#     class Meta:
#         model = User
#         fields = ['username', 'password']
#     def create(self, validated_data):
#         validated_data['password'] = make_password(validated_data.get('password'))
#         return super(UserSerializer, self).create(validated_data)
class ProductSerializer(serializers.HyperlinkedModelSerializer):
    # _id TEXT PRIMARY KEY,
    # name_product TEXT,
    # price_product TEXT,
    # image TEXT,
    # describe TEXT,
    # number NUMERIC,
    # id_category TEXT REFERENCES category (_id)
    _id=serializers.CharField()
    name_product=serializers.CharField()
    price_product=serializers.CharField()
    image=serializers.CharField()
    describe=serializers.CharField()
    number=serializers.FloatField()
    id_category=serializers.CharField()