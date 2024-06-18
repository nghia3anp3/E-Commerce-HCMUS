from transformers import RobertaForSequenceClassification, AutoTokenizer
from transformers import AutoConfig, AutoTokenizer
import torch
import sys
import random

input_path = r"../handle_txt/input_comment.txt"
output_path = "../handle_txt/output_comment.txt"
model_path = "../../AI_process/saved_model"

list_pos_replies = [
"Rất vui khi nhận được sự ủng hộ từ bạn. Hy vọng bạn sẽ tiếp tục ủng hộ^^^.",
"Cảm ơn bạn đã ủng hộ shop, chúng tôi sẽ cố gắng hơn nữa để phục vụ bạn tốt hơn.", 
"Chúng tôi rất vui khi nhận được phản hồi tích cực từ bạn, cảm ơn bạn đã ủng hộ shop!",
"Cảm ơn bạn đã tin tưởng dịch vụ và lựa chọn sản phẩm của shop. Rất mong sẽ tiếp tục được đồng hành cùng bạn trong thời gian tới ạ."]
list_neg_replies = [
"Chúng tôi rất tiếc vì sản phẩm/dịch vụ của chúng tôi đã không đáp ứng được mong đợi của bạn. Xin vui lòng liên hệ với chúng tôi qua gmail lehuuhung03@gmail.com để chúng tôi có thể hỗ trợ bạn tốt hơn.",
"Cảm ơn bạn đã phản hồi. Chúng tôi xin lỗi vì bất kỳ sự bất tiện nào đã xảy ra. Chúng tôi sẽ xem xét lại và cải thiện để phục vụ bạn tốt hơn trong tương lai.",
"Rất tiếc vì trải nghiệm của bạn không được như mong đợi. Chúng tôi rất coi trọng ý kiến của bạn và sẽ cố gắng khắc phục sớm nhất có thể.",
"Cảm ơn bạn đã cho chúng tôi biết về vấn đề này. Chúng tôi rất tiếc và sẽ nỗ lực để đảm bảo điều này không tái diễn. Xin hãy liên hệ với chúng tôi để được hỗ trợ thêm."
]

def pos_neg_classify(comment):
    model_path = "../../AI_process/saved_model"
    model = RobertaForSequenceClassification.from_pretrained(model_path)
    #tokenize
    tokenizer = AutoTokenizer.from_pretrained("wonrax/phobert-base-vietnamese-sentiment")
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    encoding = tokenizer(comment,truncation=True, padding="max_length", max_length=128, return_tensors='pt')
    input_ids = encoding['input_ids'].to(device)
    attention_mask = encoding['attention_mask'].to(device)
    with torch.no_grad():
        outputs = model(input_ids=input_ids, attention_mask=attention_mask)
        prediction = torch.argmax(outputs.logits, dim=1).item()
        if prediction == 1:
            return "Positive\n"+random.choice(list_pos_replies)
        else:
            return "Negative\n"+random.choice(list_neg_replies)
    
input_data = ""
input_notify = sys.argv[1]
if input_notify=="1":
    with open(input_path, "r", encoding="utf-8") as file:
        input_data = file.read()
    classify = pos_neg_classify(input_data)
    with open(output_path, "w", encoding="utf-8") as file:
        file.write(classify)
    print(input_notify)
sys.stdout.flush()

# print(pos_neg_classify("Sản phẩm rất tốt, tôi rất hài lòng với dịch vụ của shop"))


