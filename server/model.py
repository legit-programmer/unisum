from transformers import pipeline
from PIL import Image, ImageDraw
import pytesseract
import os
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains.summarize import load_summarize_chain
from langchain.chains.question_answering import load_qa_chain
from langchain import HuggingFaceHub
from langchain.docstore.document import Document
from langchain import PromptTemplate
from transformers import ViltProcessor, ViltForQuestionAnswering
import PyPDF2
from dotenv import load_dotenv
load_dotenv()

TOKEN = os.environ.get('TOKEN')
GOOGLE_FLAN_MODEL = HuggingFaceHub(repo_id='google/flan-t5-xxl',
                                   model_kwargs={'temperature': 1, 'min_length': 100}, huggingfacehub_api_token=TOKEN)
FACEBOOK_BART_MODEL = HuggingFaceHub(repo_id='facebook/bart-large-cnn',
                                     model_kwargs={'temperature': 0, 'min_length': 100, 'max_length': 500}, huggingfacehub_api_token=TOKEN)
SUMMARY_PROMPT = """
{text}
"""


class ImageFile:
    def __init__(self) -> None:
        self.file = None


class Doc:
    def __init__(self):
        self.doc = None

    def textToDoc(self, text: str):
        splitter = CharacterTextSplitter()
        chunks = splitter.split_text(text)
        doc = []
        for text in chunks:
            doc.append(Document(page_content=text))
        self.doc = doc
        return doc

    def setDoc(self, document):
        self.doc = document


mainDoc = Doc()


def ocr(file):
    pytesseract.pytesseract.tesseract_cmd = os.path.join(
        os.getcwd(), 'tesseract/tesseract.exe')

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
    return str(file.read())[2:-1]


def getTextSummarization(TEXT: str):
    mainDoc.setDoc(mainDoc.textToDoc(TEXT))
    summary_chain = load_summarize_chain(FACEBOOK_BART_MODEL, prompt=PromptTemplate(
        template=SUMMARY_PROMPT, input_variables=['text']))
    result = summary_chain.run(mainDoc.doc)
    # result = result.find()
    return [{"summary_text": result}]


def getAnswerFromDocument(_question):
    qachain = load_qa_chain(GOOGLE_FLAN_MODEL, chain_type="stuff")
    try:
        return (qachain({"input_documents": mainDoc.doc,
                         "question": _question}, return_only_outputs=True))
    except ValueError:
        return {'output_text': 'Too many tokens😢...'}


def summarizeFromIllustration(file):

    image_to_text = pipeline(
        "image-to-text", model="nlpconnect/vit-gpt2-image-captioning")
    return image_to_text(file)


def answerFromIllustration(question):
    text = question

    processor = ViltProcessor.from_pretrained("dandelin/vilt-b32-finetuned-vqa")
    model = ViltForQuestionAnswering.from_pretrained("dandelin/vilt-b32-finetuned-vqa")
    encoding = processor(ImageFile.file, text, return_tensors="pt")

    outputs = model(**encoding)
    logits = outputs.logits
    idx = logits.argmax(-1).item()
    answer = model.config.id2label[idx]
    return answer


def summarizeFromPdf(file):
    pdfObj = file.open()
    reader = PyPDF2.PdfReader(pdfObj)
    pdftext = ''
    for p in range(len(reader.pages)):
        page = reader.pages[p]
        pdftext = pdftext+page.extract_text()
    mainDoc.doc = mainDoc.textToDoc(pdftext)
    prompt = PromptTemplate(template=SUMMARY_PROMPT, input_variables=['text'])
    chain = load_summarize_chain(FACEBOOK_BART_MODEL, prompt=prompt)
    return [pdftext, chain.run(mainDoc.doc)]
