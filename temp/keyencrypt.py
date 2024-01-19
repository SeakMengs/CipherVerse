def f(x):
    return (x % 2) - 1

def y_equation(x, c1_, c2_, y1_, y2_):
    return f(x + c1_ * y1_ + c2_ * y2_)

def encrypt(key, plain_text, c1, c2, y1, y2, y1_prime, y2_prime):
    key_results = []
    original_values = []
    cipher_values = []
    cipher_text = ""

    if len(key) != 16:
        raise ValueError("Key must be exactly 16 characters long")

    if len(plain_text) < 1:
        raise ValueError("Plain text must not be empty")

    y = [y1, y2]
    for i in range(len(key)):
        y_n = y_equation(ord(key[i]), c1, c2, y[0], y[1])
        key_results.append(y_n)
        y[1], y[0] = y[0], y_n

    c1_prime, c2_prime = key_results[14], key_results[15]

    y = [y1_prime, y2_prime]
    for i in range(len(plain_text)):
        original_values.append(ord(plain_text[i]))
        y_n = round(ord(plain_text[i]) + c1_prime * y[0] + c2_prime * y[1])
        cipher_values.append(y_n)

        y[1], y[0] = y[0], y_n

        encoded_char = chr(y_n)
        cipher_text += encoded_char

    return key_results, original_values, cipher_values, cipher_text

def decrypt(cipher_text, c1_prime, c2_prime, y1_prime, y2_prime):
    decrypt_values = []
    decrypted_text = ""
    
    y = [y1_prime, y2_prime]
    for i in range(len(cipher_text)):
        x_n = round(ord(cipher_text[i]) - c1_prime * y[0] - c2_prime * y[1])
        decrypt_values.append(x_n)

        y[1], y[0] = y[0], ord(cipher_text[i])

        encoded_char = chr(x_n)
        decrypted_text += encoded_char

    return decrypt_values, decrypted_text
# User input for plaintext
plain_text = input("Enter the plaintext: ")


# User input for key with loop until a valid key is provided
while True:
    key = input("Enter the key (16 characters): ")
    if len(key) == 16:
        break
    else:
        print("Invalid key length. Please enter exactly 16 characters.")

# Example parameters
c1 = -0.257
c2 = 0.382
y1 = 0.934
y2 = -0.453
y1_prime = 0.423
y2_prime = -0.184

key_results, original_values, cipher_values, cipher_text = encrypt(
    key, plain_text, c1, c2, y1, y2, y1_prime, y2_prime
)

print("Key Results:")
for i, result in enumerate(key_results):
    print(f"Index: {i}; {result}")

print("\nOriginal Values:", original_values)
print("Cipher Values:", cipher_values)
print("Encrypted Text:", cipher_text)

decrypt_values, decrypted_text = decrypt(cipher_text, key_results[14], key_results[15], y1_prime, y2_prime)

print("\nDecrypt Values:", decrypt_values)
print("Decrypted Text:", decrypted_text)
