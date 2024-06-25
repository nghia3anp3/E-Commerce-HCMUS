import sys
import json
import cohere 
import os
from pymongo import MongoClient
import pymongo
from dotenv import load_dotenv
import pandas as pd
from bson import ObjectId
import json
from langchain_google_genai import GoogleGenerativeAIEmbeddings


dotenv_path = os.path.join(os.path.dirname(__file__), '..', 'backend', '.env')
load_dotenv(dotenv_path)

doc_embedding = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004", task_type="retrieval_query")
co = cohere.Client(os.getenv('COHERE_API_KEY'))
myclient = pymongo.MongoClient(os.getenv('MONGO_URL'))
mydb = myclient["SE_Ecommerce"]
mycol_description = mydb["product_informations"]


input_path = r"../../backend/handle_txt/input_query.txt"
output_path = r"../../backend/handle_txt/output_query.txt"
input_notify = sys.argv[1]

def convert_to_json(obj):
    if isinstance(obj, ObjectId):
        return str(obj)  # Chuyển đổi ObjectId thành chuỗi
    raise TypeError(f'Object of type {obj.__class__.__name__} is not JSON serializable')

def process_search(search_components, embed):
    # cohere
    embeddings = None
    total_documents = mycol_description.count_documents({})
    if embed == 1: 
        response = co.embed(
            texts=[search_components], model="embed-multilingual-v3.0", input_type="search_query"
        )
        embeddings = response.embeddings
        if isinstance(embeddings, list) and len(embeddings) > 0:
            embeddings = embeddings[0]
        embeddings = [float(val) for val in embeddings]
        cursor = mycol_description.aggregate(
            [
                {
                "$vectorSearch": {
                "index": "vector_index",
                "path": "embedding",
                "queryVector": embeddings,
                "numCandidates": total_documents,
                "limit": 5,
                }
                },
                {"$project": {"_id": 1, "product_id": 1, "score": {"$meta": "vectorSearchScore"}}},
            ]
        )
        return list(cursor)
    else:
    # gemini
        response = doc_embedding.embed_query(search_components)
        embeddings = response
        cursor = mycol_description.aggregate(
            [
                {
                "$vectorSearch": {
                "index": "vector_index_gemini",
                "path": "embedding_gemini",
                "queryVector": embeddings,
                "numCandidates": total_documents,
                "limit": 5,
                }
                },
                {"$project": {"_id": 1, "product_id": 1, "score": {"$meta": "vectorSearchScore"}}},
            ]
        )
        return list(cursor)


if input_notify=="1":
    with open(input_path, "r", encoding="utf-8") as file:
        input_data = file.read()
    results = process_search(input_data, 2)
    
    with open(output_path, "w", encoding="utf-8") as file:
        for result in results:
            file.write(json.dumps(result, default=convert_to_json) + "\n")
            
sys.stdout.flush()
