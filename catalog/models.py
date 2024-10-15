from django.db import models

class Catalog(models.Model):
    name = models.CharField(max_length=255)

class Item(models.Model):
    catalog = models.ForeignKey(Catalog, on_delete=models.CASCADE, related_name='items')
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    gender = models.CharField(max_length=50)
    breed = models.CharField(max_length=50)
    age = models.CharField(max_length=50)
    birthday = models.DateField()
    color = models.CharField(max_length=50)
    eyes = models.CharField(max_length=50)
    location = models.CharField(max_length=255)
    date_added = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)
    shares = models.IntegerField(default=0)