from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Note(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    # email=models.EmailField()
    body=models.TextField()




# class availableProducts(models.Model):
#     owner=models.TextField()
#     name=models.TextField()
#     description=models.TextField()
#     price=models.PositiveIntegerField()
#     amount=models.PositiveIntegerField()
#     img=models.ImageField()
#     expDate=models.DateField()
#     prodAddress=models.TextField()

# class orders(models.Model):
    
#     customer=models.TextField()
#     farmer=models.TextField()
#     quantity=models.PositiveIntegerField()
#     totalAmt=models.PositiveIntegerField()


