import pandas as pd 
from transformers import RobertaForSequenceClassification, AutoTokenizer
from transformers import AutoConfig, AutoTokenizer
import torch
import time 

def pos_neg_classify(comment):
    model = RobertaForSequenceClassification.from_pretrained("C://Users//DELL//Desktop//Nam3_HK2//CNPM_AI//E-Commerce-HCMUS//AI_process//saved_model")
    #tokenize
    tokenizer = AutoTokenizer.from_pretrained("wonrax/phobert-base-vietnamese-sentiment")
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    encoding = tokenizer(comment,truncation=True, padding="max_length", max_length=128, return_tensors='pt')
    input_ids = encoding['input_ids'].to(device)
    attention_mask = encoding['attention_mask'].to(device)
    with torch.no_grad():
        outputs = model(input_ids=input_ids, attention_mask=attention_mask)
        prediction = torch.argmax(outputs.logits, dim=1).item()
        return prediction

data = pd.read_csv('C://Users//DELL//Desktop//Nam3_HK2//CNPM_AI//E-Commerce-HCMUS//AI_process//data//comments_label.csv')
print(data.iloc[:10])
print(len(data))
start_time = time.time()
predicted_labels = []
for comment in data['content'][:]:
    predicted_labels.append(pos_neg_classify(comment))
end_time = time.time()
print("Time: ", end_time-start_time)
print("Predicted labels: ", predicted_labels)