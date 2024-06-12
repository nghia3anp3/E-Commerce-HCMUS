import sys
import json

input_path = r"../handle_txt/input_comment.txt"
output_path = "../handle_txt/output_comment.txt"
# input_data = ""
input_notify = sys.argv[1]

def pos_neg_classify(comment):
    if comment in ["Sản phẩm tốt", "Chất lượng cao", "Rất hài lòng", "Hài lòng"]:
        return "Positive"
    else:
        return "Negative"
    

if input_notify=="1":
    with open(input_path, "r", encoding="utf-8") as file:
        input_data = file.read()
    classify = pos_neg_classify(input_data)
    with open(output_path, "w", encoding="utf-8") as file:
        file.write(classify)
    print(input_notify)
sys.stdout.flush()
