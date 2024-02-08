c1_input = -0.1843137254901961
c2_input = 0.8823529411764706
y1_input = 0.123
y2_input = -0.987

def overflow_function(value: float) -> float:
    return ((value - 1) % 2) - 1

#TO TURN [0,256] -> [-1,1]
def normalize_function(value):
    return (value - 128) / 128

#TO TURN [-1,1] -> [0,256]
def denormalize_function(value):
    return round((value * 128) + 128)

def encrypt_value(c1_prim, c2_prim, y1, y2, value):
    return overflow_function(value + c1_prim * y1 + c2_prim * y2)

def decrypt_value(c1_prim, c2_prim, y1, y2, value):
    return overflow_function(value - c1_prim * y1 - c2_prim * y2)

def encrypt_function(c1_prim, c2_prim, y1, y2, value):
    normalized_value = []
    main_encrypt_value = []
    denormalized_encrypt_value = []

    for n in range(len(value)):
        normalized_value.append(normalize_function(value[n]))

    while True:
        current_encrypt_value = encrypt_value(c1_prim,c2_prim,y1,y2,normalized_value[0])
        current_denormalized_encrypt_value = normalize_function(denormalize_function(current_encrypt_value))

        # print("ENCRYPT: " + str(current_denormalized_encrypt_value))
        # print("ORIGINAL: " + str(normalized_value[0]))

        main_encrypt_value.append(current_denormalized_encrypt_value)
        break

    while True:
        current_encrypt_value = encrypt_value(c1_prim, c2_prim, main_encrypt_value[0], y1, normalized_value[1])
        current_denormalized_encrypt_value = normalize_function(denormalize_function(current_encrypt_value))

        # print("ENCRYPT: " + str(current_denormalized_encrypt_value))
        # print("ORIGINAL: " + str(normalized_value[1]))
        
        main_encrypt_value.append(current_denormalized_encrypt_value)
        break

    for n in range(2, len(normalized_value)):
        while True:
            current_encrypt_value = encrypt_value(c1_prim, c2_prim, main_encrypt_value[n - 1], main_encrypt_value[n - 2], normalized_value[n])
            current_denormalized_encrypt_value = normalize_function(denormalize_function(current_encrypt_value))

            # print("ENCRYPT: " + str(current_denormalized_encrypt_value))
            # print("DECRYPT: " + str(normalized_value[n]))

            main_encrypt_value.append(current_denormalized_encrypt_value)
            break

    for n in range(len(main_encrypt_value)):
        denormalized_encrypt_value.append(denormalize_function(main_encrypt_value[n]))

    return denormalized_encrypt_value

def decrypt_function(c1_prim, c2_prim, y1, y2, value):
    normalized_encrypt_value = []
    main_decrypt_value = []
    denormalized_decrypt_value = []
    
    for n in range(len(value)):
        normalized_encrypt_value.append(normalize_function(value[n]))

    main_decrypt_value.append(decrypt_value(c1_prim, c2_prim, y1, y2, normalized_encrypt_value[0]))

    main_decrypt_value.append(decrypt_value(c1_prim, c2_prim, normalized_encrypt_value[0], y1, normalized_encrypt_value[1]))

    for n in range(2, len(normalized_encrypt_value)):
        main_decrypt_value.append(decrypt_value(c1_prim, c2_prim, normalized_encrypt_value[n - 1], normalized_encrypt_value[n - 2], normalized_encrypt_value[n]))

    for n in range(len(main_decrypt_value)):
        denormalized_decrypt_value.append(denormalize_function(main_decrypt_value[n]))

    return denormalized_decrypt_value

def text_encryption(c1_prim, c2_prim, y1, y2, text):
    # print("Text Input Before Encryption: " + text)

    main_value = []
    denormalize_encrypt_value = []
    encrypt_text = ""

    for n in range(len(text)):
        main_value.append(ord(text[n]))

    denormalize_encrypt_value = encrypt_function(c1_prim, c2_prim, y1, y2, main_value)    
    
    for n in range(len(denormalize_encrypt_value)):
        encrypt_text += chr(denormalize_encrypt_value[n])
    # print("\nENCRYPTED TEXT: " + encrypt_text)
    return encrypt_text

def text_decryption(c1_prim, c2_prim, y1, y2, encrypt_text):
    # print("\nText After Encryption " + encrypt_text)

    main_encrypt_value = []
    denormalized_decrypt_value = []
    decrypt_text = "" 

    for n in range(len(encrypt_text)):
        main_encrypt_value.append(ord(encrypt_text[n]))

    denormalized_decrypt_value = decrypt_function(c1_prim, c2_prim, y1, y2,main_encrypt_value)

    for n in range(len(denormalized_decrypt_value)):
        decrypt_text += chr(denormalized_decrypt_value[n])

    # print("DECRYPTED TEXT: " + decrypt_text)
    return decrypt_text

text_decryption(c1_input, c2_input, y1_input, y2_input, text_encryption(c1_input, c2_input, y1_input, y2_input, "aa"))      
    

