from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework import status,permissions
from .models import Property
from .serializers import PropertySerializer,UserSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
import logging

logger = logging.getLogger(__name__)

# Create your views here.

# @api_view(['GET'])
# def property_list(request):
#     properties = Property.objects.all()
#     serializer = PropertySerializer(properties,many=True)
#     return Response(serializer.data)

class PropertyList(ListAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

class FilterPropertiesAPIView(APIView):
    def get(self,request):
        bedrooms = request.GET.get('bedrooms')
        carpet_area = request.GET.get('carpet_area')
        bathrooms = request.GET.get('bathrooms')
        bachelors_allowed = request.GET.get('bachelors_allowed')
        parking = request.GET.get('parking')
        pet_allowed = request.GET.get('pet_allowed')
        city = request.GET.get('city')

        properties = Property.objects.all()

        if bedrooms:
            properties = properties.filter(bedrooms=bedrooms)
        if carpet_area:
            properties = properties.filter(carpet_area=carpet_area)
        if bathrooms:
            properties = properties.filter(bathrooms=bathrooms)
        if bachelors_allowed:
            properties = properties.filter(bachelors_allowed=bachelors_allowed)
        if parking:
            properties = properties.filter(parking=parking)
        if pet_allowed:
            properties = properties.filter(pet_allowed=pet_allowed)
        if city:
            properties = properties.filter(city=city)
        
        serializer = PropertySerializer(properties,many=True)
        return Response(serializer.data)

class PropertyDetailsAPIView(APIView):
    def get(self,request,property_id):
        try:
            property = Property.objects.get(id=property_id)
            serializer = PropertySerializer(property,many=False)
            return Response(serializer.data)
        except Property.DoesNotExist:
            return Response({"message":"Property Not Found"},status=404)

class PropertyCreateAPIView(APIView):
    def post(self,request):
        serializer = PropertySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Property Created"},status=status.HTTP_201_CREATED)
        return Response({"message":"Property Creation Failed"},status=status.HTTP_400_BAD_REQUEST)

class PropertyDeleteAPIView(APIView):
    def delete(self,request,property_id):
        try:
            property  = Property.objects.get(id=property_id)
            property.delete()
            return Response({"message":"Property Deleted"},status=status.HTTP_204_NO_CONTENT)
        except Property.DoesNotExist:
            return Response({"message":"Property Not Found"},status=status.HTTP_404_NOT_FOUND) 

class PropertyUpdateAPIView(APIView):
    def put(self,request,property_id):
        try:
            property_id = Property.objects.get(id=property_id)
        except Property.DoesNotExist:
            return Response({"message":"Property Not Found"},status=status.HTTP_404_NOT_FOUND) 
        
        serializer = PropertySerializer(property_id,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Property Updated"},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) 


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserRegistrationAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self,request):
        serializers = UserSerializer(data=request.data)
        if serializers.is_valid():
            user = serializers.save()
            print("user",user)
            refresh = RefreshToken.for_user(user)
            print("refresh",refresh)
            tokens = {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }
            return Response(tokens, status=status.HTTP_201_CREATED)
        
        return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)


class ValidateAccessTokenView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        try:
            if not request.user.is_authenticated:
                raise AuthenticationFailed('Invalid or expired token')

            # Token is valid
            return Response({'valid': True}, status=status.HTTP_200_OK)
        except AuthenticationFailed as e:
            return Response({'error': str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            logger.exception('An error occurred during token validation')  # Log the exception
            return Response({'error': 'An unexpected error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)