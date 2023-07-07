from django.shortcuts import render
from django.http import HttpResponse

def activate(request):
    print(request.POST.data)
    if request.method=='POST':
        print(request.data)
    return HttpResponse(200)
