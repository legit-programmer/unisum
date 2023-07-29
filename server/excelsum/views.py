from django.shortcuts import render
from rest_framework.decorators import  api_view
from rest_framework.response import Response
from rest_framework import status
from handler.serializers import FileSerializer


@api_view(['POST'])
def activate(request):
    serializer = FileSerializer(data=request.data)
    if serializer.is_valid():
        file = request.FILES.get('file')
        print(file.name)
        return Response('OK recieved', status=status.HTTP_200_OK)
