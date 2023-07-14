from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from.models import File
from.serializers import FileSerializer


class FileUploadView(views.APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = FileSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response('Valid', status=status.HTTP_201_CREATED)
        else:
            return Response('Not valid', status=status.HTTP_400_BAD_REQUEST)
