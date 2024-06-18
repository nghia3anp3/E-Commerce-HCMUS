import cohere 
import os
from pymongo import MongoClient
import pymongo
from dotenv import load_dotenv
import pandas as pd
import time
dotenv_path = os.path.join(os.path.dirname(__file__), '..', 'backend', '.env')
load_dotenv(dotenv_path)

co = cohere.Client(os.getenv('COHERE_API_KEY'))
myclient = pymongo.MongoClient(os.getenv('MONGO_URL'))
mydb = myclient["SE_Ecommerce"]
mycol_description = mydb["product_informations"]
myembedding_col = mydb["embeddings"]

mycol_description.update_many({}, {"$set": {"embedding": None}})
query = mycol_description.find({}, {"product_id":1 ,"short_description": 1})

for product in query:
    mycol_description.find({}, {"product_id": 1, "short_description": 1})
    response = co.embed(
        texts=[product['short_description']], model="embed-multilingual-v3.0", input_type="search_document"
    )
    time.sleep(1.8)
    
    mycol_description.update_one(
        {"product_id": product["product_id"]},
        {"$set": {"embedding": response.embeddings[0]}} 
    )

