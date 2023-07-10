from rest_framework.decorators import api_view
from rest_framework.response import Response
from model import getAnswerFromImage


@api_view(['POST'])
def activate(request):
    data = dict(request.data)
    print(data['question'])
    result = getAnswerFromImage('files/result.png', data['question'])
    print(result)
    return Response(result, 200)