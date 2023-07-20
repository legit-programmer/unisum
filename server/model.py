from transformers import pipeline
from PIL import Image, ImageDraw
import pytesseract
import os

class ImageFile:
    def __init__(self) -> None:
        self.file = None

def ocr(file):
    pytesseract.pytesseract.tesseract_cmd = os.path.join(os.getcwd(), 'tesseract/tesseract.exe')

    result = pytesseract.image_to_string(file)
    return result


def saveTextAsImage(text: str):
    arr = text.split()
    count = 0
    mainText = ''
    for i in arr:
        if count >= 20:
            mainText = mainText + '\n' + i
            count = 0
        mainText = mainText + ' ' + i
        count += 1

    img = Image.new('RGB', (1000, 1000), (255, 255, 255))
    d1 = ImageDraw.Draw(img)
    d1.text((1, 1), mainText.encode('utf-8'), fill=(255, 0, 0))
    ImageFile.file = img
    ImageFile.file.show()
    

def getTextFromDotTxt(file):
    return str(file.read())[2:-2]


def getTextSummarization(TEXT: str):
    
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    try:
        data = summarizer(TEXT, max_length=500, min_length=50, do_sample=False)
    except IndexError:
        return [{"summary_text": 'Sorry, the content is too large to be processed...'}]
    return data


def getAnswerFromImage(_question):
    model = pipeline("document-question-answering",
                    model="naver-clova-ix/donut-base-finetuned-docvqa")
    return model(image=ImageFile.file, question=_question)


def summarizeFromIllustration(file):
    
    image_to_text = pipeline(
        "image-to-text", model="nlpconnect/vit-gpt2-image-captioning")
    return image_to_text(file)
