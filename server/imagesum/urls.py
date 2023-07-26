from django.urls import path
from.import views

urlpatterns = [
    path('question/', views.activate),
    path('illtrees/question/', views.activateTheSecond),
    path('illtrees/upload/', views.upload),
    path('text/upload/', views.textUpload)
]