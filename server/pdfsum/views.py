from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from handler.serializers import FileSerializer
from rest_framework import status


@api_view(['POST'])
def upload(request):
    serializer = FileSerializer(data=request.data)
    if serializer.is_valid():
        file = request.FILES.get('file')
        print(file.name + ' recieved')
        return Response('File recieved', status=status.HTTP_200_OK)
    return Response('Bad request', status=status.HTTP_400_BAD_REQUEST)
