with open('C:\Users\DELL\Desktop\Nam3_HK2\CNPM_AI\E-Commerce-HCMUS\backend\controllers\output.txt', 'r', encoding='latin1') as f:
    incorrectly_encoded_text = f.read()

# Decode and re-encode the text correctly
correctly_encoded_text = incorrectly_encoded_text.encode('latin1').decode('utf-8')

print(correctly_encoded_text)  # Output should be 'tôi thích'