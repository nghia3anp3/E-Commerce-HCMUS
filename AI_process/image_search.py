import sys
import json

def image_process(image):
    label = None
    
    return label

if __name__ == "__main__":
    # Đọc dữ liệu từ stdin
    input_data = sys.stdin.read()
    data = json.loads(input_data)
    result = image_process(data['image'])
    print(json.dumps({"status": "OK", "result": result}))
