from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User

class serializer1(ModelSerializer):
    class Meta:
        model=User
        fields=['username','password']