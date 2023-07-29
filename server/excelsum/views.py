from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from handler.serializers import FileSerializer
from model import getExcelSummary
import os


@api_view(['POST'])
def activate(request):
    import tempfile
    serializer = FileSerializer(data=request.data)
    if serializer.is_valid():
        file = request.FILES.get('file')
        print(file.name + ' recieved')
        tempdir = os.path.join(tempfile.gettempdir(), 'unidump')
        filepath = os.path.join(tempdir, file.name)
        with open(filepath, 'wb+') as tempdirfile:
            for chunk in file.chunks():
                tempdirfile.write(chunk)

        data = getExcelSummary(filepath, file.name)

        return Response(data={'summary_text': data}, status=status.HTTP_200_OK)
