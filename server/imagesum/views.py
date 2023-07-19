from rest_framework.decorators import api_view
from rest_framework.response import Response
from model import getAnswerFromImage, summarizeFromIllustration, ocr, getTextSummarization
from handler.serializers import FileSerializer
from rest_framework import status
from PIL import Image
from numpy import asarray


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
        image.show()
        data = {'text':str(summarizeFromIllustration(image)[0]['generated_text'])}
        
        return Response(data, status=status.HTTP_200_OK)
    else:
        return Response('Nope', status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def textUpload(request):
    serializer = FileSerializer(data=request.data)
    if serializer.is_valid():
        file = request.FILES.get('file')
        try:
            image = Image.open(file)
        except ValueError:
            image = Image.open(file).convert('RGB')
            
        image.show()
        imarray = asarray(image)
        text = ocr(imarray)
        print('OCR RESULT: ' , text)
        # data = getTextSummarization(text)
        # print(data)
        return Response('gooood', 200)
    return Response('baad', status=status.HTTP_400_BAD_REQUEST)
