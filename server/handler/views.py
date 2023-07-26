from model import getTextFromDotTxt, getTextSummarization, saveTextAsImage
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import FileSerializer


class FileUploadView(views.APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = FileSerializer(data=request.data)
        if serializer.is_valid():
            text = getTextFromDotTxt(request.FILES.get('file'))
            result = getTextSummarization(text)
            result.append({'text':text})
            return Response(result, status=status.HTTP_200_OK)
        else:
            return Response('Not valid', status=status.HTTP_400_BAD_REQUEST)
