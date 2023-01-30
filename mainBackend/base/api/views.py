from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import Noteserializer
from base.models import Note
from django.contrib.auth.models import User

from django.contrib.auth.decorators import login_required


from .serializers1 import serializer1
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


@api_view(['GET'])
def getRoutes(request):
    routes=[
        '/api/tokens',
        '/api/tokens/refresh'
    ]
    return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNote(request):
    user=request.user
    # note=Note.objects.all()
    note=user.note_set.all()
    Nserializer=Noteserializer(note,many=True)
    return Response(Nserializer.data)



@api_view(['POST'])
def createNote(request):
    data = request.data
    # print(data['password'])
    note = User.objects.create(
        username=data['username'],
        email=data['email']
    )
    
    note.set_password(data['password'])
    note.save()
    serializer =serializer1(note, many=True)
    return Response(serializer.data)  


  

