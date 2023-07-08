from rest_framework.decorators import api_view
from rest_framework.response import Response
from model import getTextSummarization


@api_view(['POST'])
def activate(request):
    data = dict(request.data)
    print(data['text'])
    result = getTextSummarization(data['text'])
    print(result)
    return Response(result, 200)

