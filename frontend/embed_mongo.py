import cohere 
import os
from pymongo import MongoClient
import pymongo
from dotenv import load_dotenv
import pandas as pd
import time
load_dotenv()
co = cohere.Client(os.getenv('COHERE_API_KEY'))
response = co.embed(
    texts=["hello", "goodbye"], model="embed-english-v3.0", input_type="classification"
)
myclient = pymongo.MongoClient(os.getenv('NAM_MONGO_URL'))
mydb = myclient["test_SE_Ecommerce"]
mycol_description = mydb["product_infomations"]
myembedding_col = mydb["embeddings"]

mycol_description.update_many({}, {"$set": {"embedding": None}})
query = mycol_description.find({}, {"product_id":1 ,"short_description": 1})

for product in mycol_description.find({}, {"product_id": 1, "short_description": 1}):
    response = co.embed(
        texts=[product['short_description']], model="embed-multilingual-v3.0", input_type="search_document"
    )
    time.sleep(1.8)
    
    mycol_description.update_one(
        {"product_id": product["product_id"]},
        {"$set": {"embedding": response.embeddings[0]}} 
    )


