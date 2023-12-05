from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
# from api.serializers import UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
# class UserLogin(APIView):
#     def get(self,request,format=None):
#         content = {
#             'user': str(request.user),  # `django.contrib.auth.User` instance.
#             'auth': str(request.auth),  # None
#         }
#         return Response(content)
#     def post(self, request, format=None):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             user=authenticate(serializer.data["username"],serializer.data["password"])
#             if user:
#                 return Response({"username":serializer.data["username"]}, status=status.HTTP_200_OK)
#             else:
#                 return Response(status=status.HTTP_403_FORBIDDEN)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
