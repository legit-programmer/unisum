from rest_framework.decorators import api_view
from rest_framework.response import Response
from model import getAnswerFromDocument, getTextFromDotTxt, summarizeFromIllustration, ocr, getTextSummarization, ImageFile, answerFromIllustration
from handler.serializers import FileSerializer
from rest_framework import status
from PIL import Image


@api_view(['POST'])
def activate(request):
    file = request.FILES['file']
    
    data = dict(request.data)
    print(data['question'])
    result = getAnswerFromDocument(data['question'], file)
    print(result)
    return Response(result, 200)


@api_view(['POST'])
def activateTheSecond(request):
    data = dict(request.data)
    print(data['question'])
    result = answerFromIllustration(data['question'])
    print(result)
    return Response({'output_text': result}, 200)


@api_view(['POST'])
def upload(request):
    serializer = FileSerializer(data=request.data)
    if serializer.is_valid():
        file = request.FILES.get('file')
        image = Image.open(file)
        ImageFile.file = image
        data = {'text': str(summarizeFromIllustration(image)[
                            0]['generated_text'])}

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

        text = ocr(image)

        print('OCR RESULT: ', text)
        data = getTextSummarization(text)
        print(data)
        return Response(data, 200)
    return Response('bad request', status=status.HTTP_400_BAD_REQUEST)
