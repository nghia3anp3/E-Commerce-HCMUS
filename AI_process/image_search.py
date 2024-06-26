import sys
import json
import torch
import torchvision.transforms as transforms
import torchvision.models as models
import cv2
import faiss
import numpy as np
from PIL import Image, UnidentifiedImageError
import pandas as pd
import os

# Thiết lập biến môi trường
os.environ['KMP_DUPLICATE_LIB_OK'] = 'TRUE'

def load_model():
    model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)
    return model

model = load_model()


def preprocess_image_cv2(image_path):
    img = cv2.imread(image_path)
    if img is None:
        raise UnidentifiedImageError(f"Không thể nhận dạng tệp hình ảnh {image_path}")


    # Chuyển đổi hình ảnh từ BGR sang RGB
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Sử dụng torchvision để tiền xử lý hình ảnh
    preprocess = transforms.Compose([
        transforms.ToPILImage(),
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    img_tensor = preprocess(img)
    img_tensor = img_tensor.unsqueeze(0)  # Thêm batch dimension

    return img_tensor


def extract_resnet50_features(image_tensor):
    # Load the pretrained ResNet50 model
    model = models.resnet50(pretrained=True)
    # Remove the fully connected layers
    model = torch.nn.Sequential(*list(model.children())[:-1])
    model.eval()

    with torch.no_grad():
        features = model(image_tensor)

    return features.view(-1)

# Load faiss index
# input_path_faiss = r"../../AI_process/image_search/faiss_index.index"
input_path_faiss = "../../AI_process/image_search/faiss_index.index"

index = faiss.read_index(input_path_faiss)

# Đường dẫn đến tệp danh sách các tệp hình ảnh
# file_list_path = r"../../AI_process/image_search/anhxa.txt"
file_list_path = r"../../AI_process/image_search/anhxa.txt"
# Đọc danh sách các tên tệp hình ảnh từ tệp .txt
with open(file_list_path, "r") as f:
    file_list = f.read().splitlines()

# Path to file mapping image filenames to product IDs
# image_to_id_path = r"../../AI_process/image_search/image_names.txt"
image_to_id_path = r"../../AI_process/image_search/image_names.txt"

def image_process():
    # Xử lý hình ảnh input'
    img_tensor = preprocess_image_cv2("../../frontend/src/img/input_image.jpg") #image là path
    features = extract_resnet50_features(img_tensor)
    features_np = features.numpy()
    input_features = features_np.reshape(1, -1)

    # Tìm 5 vector gần nhất với vector của hình ảnh input
    k = 100
    D, I = index.search(input_features, k)

    # In ra 50 hình ảnh gần nhất
    print("50 hình ảnh gần nhất:")
    nearest_image_filenames = []
    for i in range(k):
        nearest_image_filenames.append(file_list[I[0][i]])

    for filename in nearest_image_filenames:
        print(filename)
    # Read mapping of image filenames to product IDs
    image_to_id = {}
    with open(image_to_id_path, "r") as f:
        for line in f:
            image_file, product_id = line.strip().split('-')
            image_to_id[image_file] = product_id

    # Extract 5 unique product IDs from nearest image filenames
    unique_product_ids = set()
    for filename in nearest_image_filenames:
        if len(unique_product_ids) >= 10:
            break
        product_id = image_to_id.get(filename)
        if product_id:
            unique_product_ids.add(product_id)

    # Convert to list of JSON objects
    json_objects = []
    for product_id in unique_product_ids:
        json_objects.append({"product_id": int(product_id)})  # Convert product_id to int if needed

    return json_objects

# Save unique product IDs to a new .txt file
input_image = sys.argv[1]
print(input_image)
# input_image = '../../AI_process/image_search/test.jpg'
output_path = r"../handle_txt/output_image.txt"

unique_product_ids = image_process()

# Write JSON objects to txt file
with open(output_path, "w") as f:
    for obj in unique_product_ids:
        json.dump(obj, f)
        f.write('\n')  # Newline to separate objects