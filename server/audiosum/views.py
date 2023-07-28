from django.shortcuts import render
from model import getTranscription
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
import tempfile
from handler.serializers import FileSerializer
import os

@api_view(['POST'])
def activate(request):
    serializer = FileSerializer(data=request.data)
    if serializer.is_valid():
        file = request.FILES.get('file')
        dir = tempfile.mkdtemp()
        print(dir)
        os.rmdir(dir)
        return Response(status=status.HTTP_200_OK)