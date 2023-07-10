from transformers import pipeline
from PIL import Image, ImageDraw, ImageFont

def saveTextAsImage(text:str):
    img = Image.new('RGB', (200, 200), (255, 255, 255))
    d1 = ImageDraw.Draw(img)
    
def getTextSummarization(TEXT:str):
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")     
    data = summarizer(TEXT, max_length=130, min_length=50, do_sample=False)
    return data

# Import Image for basic functionalities like open, save, show
# Import ImageDraw to convert image into editable format
# Import ImageFont to choose the font style


# gfg_logo.jpeg image opened using open
# function and assigned to variable named img


# Image is converted into editable form using
# Draw function and assigned to d1


# Font selection from the downloaded file
myFont = ImageFont.truetype('/home/raghav/PycharmProjects/gfg/Mistral.ttf', 20)

# Decide the text location, color and font
d1.text((65, 10), "Sample text", fill =(255, 0, 0),font=myFont)

# show and save the image
img.show()
img.save("results.jpeg")

