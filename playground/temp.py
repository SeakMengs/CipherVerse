def overflow_function(value: float) -> float:
    return ((value - 1) % 2) - 1

# TO TURN [0,256] -> [-1,1]
def normalize_function(value):
    return (value - 128) / 128

# TO TURN [-1,1] -> [0,256]
def denormalize_function(value):
    return round((value * 128) + 128)

def encrypt_value(c1_prim, c2_prim, y1, y2, value):
    return overflow_function(value + c1_prim * y1 + c2_prim * y2)

def decrypt_value(c1_prim, c2_prim, y1, y2, value):
    return overflow_function(value - c1_prim * y1 - c2_prim * y2)

def text_encryption(c1_prim, c2_prim, y1, y2, text):
    print("Text Input Before Encryption: " + text)
    encrypted_text = ""
    
    for char in text:
        value = ord(char)
        normalized_value = normalize_function(value)
        encrypted_value = encrypt_value(c1_prim, c2_prim, y1, y2, normalized_value)
        denormalized_value = denormalize_function(encrypted_value)
        encrypted_text += chr(denormalized_value)
    
    print("\nENCRYPTED TEXT: " + encrypted_text)
    return encrypted_text

def text_decryption(c1_prim, c2_prim, y1, y2, encrypted_text):
    print("\nText After Encryption " + encrypted_text)
    decrypted_text = ""

    for char in encrypted_text:
        value = ord(char)
        normalized_value = normalize_function(value)
        decrypted_value = decrypt_value(c1_prim, c2_prim, y1, y2, normalized_value)
        denormalized_value = denormalize_function(decrypted_value)
        decrypted_text += chr(denormalized_value)

    print("DECRYPTED TEXT: " + decrypted_text)
    return decrypted_text

c1_input = -0.1843137254901961
c2_input = 0.8823529411764706
y1_input = 0.123
y2_input = -0.987

text_decryption(c1_input, c2_input, y1_input, y2_input, text_encryption(c1_input, c2_input, y1_input, y2_input, "abdsadsadasdddasdasdasdasdsadasdzxvvzxcbvcxnvcbncvxbc"))
