from langchain_google_genai import GoogleGenerativeAIEmbeddings
import cohere 
import os
from pymongo import MongoClient
import pymongo
from dotenv import load_dotenv
import pandas as pd
import time
dotenv_path = os.path.join(os.path.dirname(__file__), '..', 'backend', '.env')
load_dotenv(dotenv_path)

doc_embedding = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004", task_type="retrieval_document")
myclient = pymongo.MongoClient(os.getenv('MONGO_URL'))
mydb = myclient["SE_Ecommerce"]
mycol_description = mydb["product_informations"]
myembedding_col = mydb["embedding_gemini"]

mycol_description.update_many({}, {"$set": {"embedding_gemini": None}})
query = mycol_description.find({}, {"product_id":1 ,"summary_info": 1})
    
for product in query:
    mycol_description.find({}, {"product_id": 1, "summary_info": 1})
    response = doc_embedding.embed_query(product['summary_info'])
    print(response[0:5])
    time.sleep(1.5)
    
    mycol_description.update_one(
        {"product_id": product["product_id"]},
        {"$set": {"embedding_gemini": response}} 
    )

