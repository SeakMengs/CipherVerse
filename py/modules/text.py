class CipherVerseText:
    # def __init__(self, plain_text, key, c1, c2, y1, y2, y1_prime, y2_prime):
    #     self.plain_text = plain_text
    #     self.key = key
    #     self.c1 = c1
    #     self.c2 = c2
    #     self.y1 = y1
    #     self.y2 = y2
    #     self.y1_prime = y1_prime
    #     self.y2_prime = y2_prime

    def f(self, x):
        return ((x + 1) % 2) - 1

    def y_equation(self, x, c1_, c2_, y1_, y2_):
        return self.f(x + c1_ * y1_ + c2_ * y2_)

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
            y_n = self.y_equation(ord(key[i]), c1, c2, y[0], y[1])
            key_results.append(y_n)
            y[1], y[0] = y[0], y_n

        c1_prime, c2_prime = key_results[14], key_results[15]

        # encryption operation
        y = [y1_prime, y2_prime]
        for i in range(len(plain_text)):
            original_values.append(ord(plain_text[i]))
            # y_n = round(ord(plain_text[i]) + c1_prime * y[0] + c2_prime * y[1])
            y_n = ((ord(plain_text[i]) - 128) / 128) + c1_prime * y[0] + c2_prime * y[1]
            print("round:", ((ord(plain_text[i]) - 128) / 128))
            # y_n = ord(plain_text[i]) + c1_prime * y[0] + c2_prime * y[1]
            print(y_n)
            cipher_values.append(y_n)

            y[1], y[0] = y[0], y_n

            encoded_char = chr(y_n)
            # encoded_char = chr(round(y_n))
            cipher_text += encoded_char

        return key_results, original_values, cipher_values, cipher_text

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

        return decrypt_values, decrypted_text, cipher_values
