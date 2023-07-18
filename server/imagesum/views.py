from rest_framework.decorators import api_view
from rest_framework.response import Response
from model import getAnswerFromImage, summarizeFromIllustration
from handler.serializers import FileSerializer
from rest_framework import status
from PIL import Image

@api_view(['POST'])
def activate(request):
    data = dict(request.data)
    print(data['question'])
    result = getAnswerFromImage(data['question'])
    print(result)
    return Response(result, 200)

@api_view(['POST'])
def upload(request):
    serializer = FileSerializer(data=request.data)
    if serializer.is_valid():
        file = request.FILES.get('file')
        image = Image.open(file)
        print(summarizeFromIllustration(image))
        return Response('check console!', 200)
    else:
        return Response('Nope', status.HTTP_400_BAD_REQUEST)

