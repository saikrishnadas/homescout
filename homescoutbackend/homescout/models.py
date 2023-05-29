from django.db import models

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email

class Property(models.Model):
    title = models.CharField(max_length=255,db_index=True)
    rent = models.DecimalField(max_digits=10,decimal_places=2,null=True)
    build_up_area = models.DecimalField(max_digits=10,decimal_places=2,null=True)
    carpet_area = models.DecimalField(max_digits=10,decimal_places=2,null=True)
    bedrooms = models.PositiveIntegerField(null=True)
    bathrooms = models.PositiveIntegerField(null=True)
    parking = models.BooleanField(default=False,null=True)
    listed_by = models.ForeignKey(User,on_delete=models.CASCADE,related_name="properties",null=True)
    property_on = models.CharField(max_length=255,null=True)
    listed_on = models.DateTimeField(auto_now_add=True,null=True)
    bachelors_allowed = models.BooleanField(default=True,null=True)
    security_deposit = models.DecimalField(max_digits=10, decimal_places=2,null=True)
    pet_allowed = models.BooleanField(default=False,null=True)
    non_vegetarian = models.BooleanField(default=True,null=True)
    property_description = models.TextField(null=True)
    city = models.CharField(max_length=255,null=True)
    state = models.CharField(max_length=255,null=True)
    country = models.CharField(max_length=255,null=True)
    location = models.CharField(max_length=255,null=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,null=True)

    def __str__(self):
        return self.title
