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
import time

dotenv_path = os.path.join(os.path.dirname(__file__), '..', 'backend', '.env')
load_dotenv(dotenv_path)

co = cohere.Client(os.getenv('COHERE_API_KEY'))
myclient = pymongo.MongoClient(os.getenv('MONGO_URL'))
mydb = myclient["SE_Ecommerce"]
mycol_description = mydb["product_informations"]

dataset_path = r"../AI_Evaluation_Dataset/semantic_search.xlsx"
dataset_path_test = r"../AI_Evaluation_Dataset/test.xlsx"

def process_search(dataset_path):
    res = []
    df = pd.read_excel(dataset_path)
    search_components = df['Query'].to_list()
    for i in search_components:
        print(i)
        response = co.embed(
            texts=[i], model="embed-multilingual-v3.0", input_type="search_query"
        )
        total_documents = mycol_description.count_documents({})
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
                "limit": 10,
                }
                },
                {"$project": {"_id": 0, "product_id": 1}},
            ]
        )
        time.sleep(2)
        res.append(list(cursor))
    return res

def evaluation(recommend_results, df, threshold=None):
    pass_case = 0
    if threshold is None:
        threshold = 0.5
    
    # Tạo một bản sao của dataframe để tránh cảnh báo SettingWithCopyWarning
    df_copy = df.copy()
    
    # Tạo một danh sách để lưu trữ kết quả đánh giá
    assessments = []
    
    for i in range(len(df)):
        # Xét xem trong Result có nhiều hơn 5 không
        ground_truth = df['Result'][i].split(", ")
        size_ground_truth = len(ground_truth)

        # Nếu lớn hơn 5 thì đặt max_check = 5
        if size_ground_truth > 10:
            max_check = 10
        else:
            max_check = size_ground_truth

        # Biến count đếm số lượng trùng
        count_pass = 0 
        for id in recommend_results[i]:
            print(id)
            if str(id['product_id']) in ground_truth:
                count_pass += 1
        
        # Chia ra lấy %
        print(count_pass / max_check)
        if count_pass / max_check >= threshold:
            pass_case += 1
            assessments.append('Pass')
        else:
            assessments.append('Fail')
    
    # Thêm cột Assessment vào bản sao của df
    df_copy['Assessment'] = assessments
    
    return pass_case, df_copy

result = process_search(dataset_path)

df = pd.read_excel(dataset_path)
pass_cases, eval_df = evaluation(result, df, 0.1)
eval_df.to_excel(r"../AI_Evaluation_Dataset/semantic_search_eval.xlsx")
print("Accuracy: ", pass_cases/len(df))
