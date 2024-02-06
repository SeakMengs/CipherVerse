# Old implementation
class CipherVerseText:
    def __f(self, x):
        return ((x + 1) % 2) - 1

    def __y_equation(self, x, c1_, c2_, y1_, y2_):
        return self.__f(x + c1_ * y1_ + c2_ * y2_)

    def encrypt(self, key, plain_text, c1, c2, y1, y2, y1_prime, y2_prime):
        key_results = []
        original_values = []
        cipher_values = []
        cipher_text = ""

        if len(key) != 16:
            raise ValueError("Key must be exactly 16 characters long")

        if len(plain_text) < 1:
            raise ValueError("Plain text must not be empty")

        # key stream operation
        y = [y1, y2]
        for i in range(len(key)):
            y_n = self.__y_equation(ord(key[i]), c1, c2, y[0], y[1])
            key_results.append(y_n)
            y[1], y[0] = y[0], y_n

        c1_prime, c2_prime = key_results[14], key_results[15]

        # encryption operation
        y = [y1_prime, y2_prime]
        for i in range(len(plain_text)):
            original_values.append(ord(plain_text[i]))
            y_n = round(ord(plain_text[i]) + c1_prime * y[0] + c2_prime * y[1])
            # y_n = ((ord(plain_text[i]) - 128) / 128) + c1_prime * y[0] + c2_prime * y[1]
            # print("round:", ((ord(plain_text[i]) - 128) / 128))
            # y_n = ord(plain_text[i]) + c1_prime * y[0] + c2_prime * y[1]
            # print(y_n)
            cipher_values.append(y_n)

            y[1], y[0] = y[0], y_n

            encoded_char = chr(y_n)
            # encoded_char = chr(round(y_n))
            cipher_text += encoded_char

        success = 1
        return key_results, original_values, cipher_values, cipher_text, success

    def decrypt(self, cipher_text, c1_prime, c2_prime, y1_prime, y2_prime):
        decrypt_values = []
        decrypted_text = ""
        # not important
        cipher_values = [ord(char) for char in cipher_text]

        # decryption operation
        y = [y1_prime, y2_prime]
        for i in range(len(cipher_text)):
            x_n = round(ord(cipher_text[i]) -
                        c1_prime * y[0] - c2_prime * y[1])
            decrypt_values.append(x_n)

            y[1], y[0] = y[0], ord(cipher_text[i])

            encoded_char = chr(x_n)
            decrypted_text += encoded_char

        success = 1
        return decrypt_values, decrypted_text, cipher_values, success
# class CipherVerseText:
#     def __init__(self) -> None:
#         self.debug = False

#     def __overflow_function(self, value: float) -> float:
#         return ((value - 1) % 2) - 1

#     # TO TURN [0,256] -> [-1,1]
#     def __normalize_function(self, value: float) -> float:
#         return (value - 128) / 128

#     # TO TURN [-1,1] -> [0,256]
#     def __denormalize_function(self, value: float) -> float:
#         return round((value * 128) + 128)

#     def __encrypt_value(self, c1_prim, c2_prim, y1, y2, value):
#         return self.__overflow_function(value + c1_prim * y1 + c2_prim * y2)

#     def __decrypt_value(self, c1_prim, c2_prim, y1, y2, value):
#         return self.__overflow_function(value - c1_prim * y1 - c2_prim * y2)

#     def __encrypt_function(self, c1_prim, c2_prim, y1, y2, value):
#         normalized_value = []
#         main_encrypt_value = []
#         denormalized_encrypt_value = []

#         for n in range(len(value)):
#             normalized_value.append(self.__normalize_function(value[n]))

#         while True:
#             current_encrypt_value = self.__encrypt_value(
#                 c1_prim, c2_prim, y1, y2, normalized_value[0])
#             current_denormalized_encrypt_value = self.__normalize_function(
#                 self.__denormalize_function(current_encrypt_value))

#             if self.debug:
#                 print("ENCRYPT: " + str(current_denormalized_encrypt_value))
#                 print("ORIGINAL: " + str(normalized_value[0]))

#             main_encrypt_value.append(current_denormalized_encrypt_value)
#             break

#         while True:
#             current_encrypt_value = self.__encrypt_value(
#                 c1_prim, c2_prim, main_encrypt_value[0], y1, normalized_value[1])
#             current_denormalized_encrypt_value = self.__normalize_function(
#                 self.__denormalize_function(current_encrypt_value))

#             if self.debug:
#                 print("ENCRYPT: " + str(current_denormalized_encrypt_value))
#                 print("ORIGINAL: " + str(normalized_value[1]))

#             main_encrypt_value.append(current_denormalized_encrypt_value)
#             break

#         for n in range(2, len(normalized_value)):
#             while True:
#                 current_encrypt_value = self.__encrypt_value(
#                     c1_prim, c2_prim, main_encrypt_value[n - 1], main_encrypt_value[n - 2], normalized_value[n])
#                 current_denormalized_encrypt_value = self.__normalize_function(
#                     self.__denormalize_function(current_encrypt_value))

#                 if self.debug:
#                     print("ENCRYPT: " + str(current_denormalized_encrypt_value))
#                     print("DECRYPT: " + str(normalized_value[n]))

#                 main_encrypt_value.append(current_denormalized_encrypt_value)
#                 break

#         for n in range(len(main_encrypt_value)):
#             denormalized_encrypt_value.append(
#                 self.__denormalize_function(main_encrypt_value[n]))

#         return denormalized_encrypt_value

#     def __decrypt_function(self, c1_prim, c2_prim, y1, y2, value):
#         normalized_encrypt_value = []
#         main_decrypt_value = []
#         denormalized_decrypt_value = []

#         for n in range(len(value)):
#             normalized_encrypt_value.append(
#                 self.__normalize_function(value[n]))

#         main_decrypt_value.append(self.__decrypt_value(
#             c1_prim, c2_prim, y1, y2, normalized_encrypt_value[0]))

#         main_decrypt_value.append(self.__decrypt_value(
#             c1_prim, c2_prim, normalized_encrypt_value[0], y1, normalized_encrypt_value[1]))

#         for n in range(2, len(normalized_encrypt_value)):
#             main_decrypt_value.append(self.__decrypt_value(
#                 c1_prim, c2_prim, normalized_encrypt_value[n - 1], normalized_encrypt_value[n - 2], normalized_encrypt_value[n]))

#         for n in range(len(main_decrypt_value)):
#             denormalized_decrypt_value.append(
#                 self.__denormalize_function(main_decrypt_value[n]))

#         return denormalized_decrypt_value

#     def encrypt(self, c1_prim, c2_prim, y1, y2, text):
#         if self.debug:
#             print("Text Input Before Encryption: " + text)

#         main_value = []
#         denormalize_encrypt_value = []
#         encrypt_text = ""

#         for n in range(len(text)):
#             main_value.append(ord(text[n]))

#         denormalize_encrypt_value = self.__encrypt_function(
#             c1_prim, c2_prim, y1, y2, main_value)

#         for n in range(len(denormalize_encrypt_value)):
#             encrypt_text += chr(denormalize_encrypt_value[n])

#         if self.debug:
#             print("\nENCRYPTED TEXT: " + encrypt_text)

#         return encrypt_text

#     def decrypt(self, c1_prim, c2_prim, y1, y2, encrypt_text):
#         if self.debug:
#             print("Text After Encryption " + encrypt_text)

#         main_encrypt_value = []
#         denormalized_decrypt_value = []
#         decrypt_text = ""

#         for n in range(len(encrypt_text)):
#             main_encrypt_value.append(ord(encrypt_text[n]))

#         denormalized_decrypt_value = self.__decrypt_function(
#             c1_prim, c2_prim, y1, y2, main_encrypt_value)

#         for n in range(len(denormalized_decrypt_value)):
#             decrypt_text += chr(denormalized_decrypt_value[n])

#         if self.debug:
#             print("DECRYPTED TEXT: " + decrypt_text)

#         return decrypt_text
