from transformers import pipeline
from PIL import Image, ImageDraw
import os


def saveTextAsImage(text: str):
    img = Image.new('RGB', (1000, 1000), (255, 255, 255))
    d1 = ImageDraw.Draw(img)
    d1.text((1, 1), text, fill=(255, 0, 0))
    img.show()
    print(os.getcwd())
    img.save("files/result.png")


def getTextSummarization(TEXT: str):
    saveTextAsImage(TEXT)
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    data = summarizer(TEXT, max_length=130, min_length=50, do_sample=False)
    return data

def getAnswerFromImage(img, _question):
    model = pipeline("document-question-answering", model="naver-clova-ix/donut-base-finetuned-docvqa")
    image = Image.open("files/result.png")
    return model(image=image, question=_question)