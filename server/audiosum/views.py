from django.shortcuts import render
from model import getTranscription
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from handler.serializers import FileSerializer
import os

@api_view(['POST'])
def activate(request):
    import tempfile
    serializer = FileSerializer(data=request.data)
    if serializer.is_valid():
        file = request.FILES.get('file')
        dir = os.path.join(tempfile.gettempdir(), 'unidump')
        path = os.path.join(dir, file.name)
        with open(path, 'wb+') as tempfile:
            for chunk in file.chunks():
                tempfile.write(chunk)
        getTranscription(path)
        
        return Response(status=status.HTTP_200_OK)