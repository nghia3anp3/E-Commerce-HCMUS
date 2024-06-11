import sys
import json
import cohere 
import os
from pymongo import MongoClient
import pymongo
from dotenv import load_dotenv
import pandas as pd

load_dotenv()

co = cohere.Client(os.getenv('COHERE_API_KEY'))
myclient = pymongo.MongoClient(os.getenv('MONGO_URL'))
mydb = myclient["SE_Ecommerce"]
mycol_description = mydb["product_informations"]

def process_search(search_components):
    response = co.embed(
        texts=[search_components], model="embed-multilingual-v3.0", input_type="search_query"
    )
    cursor = mycol_description.aggregate(
        [
            {
            "$vectorSearch": {
            "index": "default",
            "path": "embedding",
            "queryVector": response.tolist(),
            "numCandidates": 12,
            "limit": 9,
            }
            },
            {"$project": {"_id": 1, "score": {"$meta": "vectorSearchScore"}}},
        ]
    )
    return list(cursor)

if __name__ == "__main__":
    input_data = sys.stdin.read()
    data = json.loads(input_data)
    result = process_search(data['search_components'])
    print(json.dumps({"status": "OK", "result": result}))
