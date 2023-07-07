from transformers import pipeline

def getTextSummarization(TEXT:str):
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")     
    return summarizer(TEXT, max_length=130, min_length=50, do_sample=False)
