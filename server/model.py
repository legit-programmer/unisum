from transformers import pipeline
from PIL import Image, ImageDraw


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
    img.show()
    img.save("files/result.png")


def getTextSummarization(TEXT: str):
    saveTextAsImage(TEXT)
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    try:
        data = summarizer(TEXT, max_length=500, min_length=50, do_sample=False)
    except IndexError:
        return [{"summary_text": 'Sorry, the content is too large to be processed...'}]
    return data


def getAnswerFromImage(_question):
    model = pipeline("document-question-answering",
                     model="naver-clova-ix/donut-base-finetuned-docvqa")
    image = Image.open("files/result.png")
    return model(image=image, question=_question)
