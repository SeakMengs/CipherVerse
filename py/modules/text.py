from .utils import CipherVerseUtils, _x_equation, _y_equation


class CipherVerseText(CipherVerseUtils):
    def encrypt(self, key, plain_text, c1, c2, y1, y2, y1_prime, y2_prime):
        if len(key) != 16:
            raise ValueError("Key must be exactly 16 characters long")

        if len(plain_text) < 1:
            raise ValueError("Plain text must not be empty")

        key_results = self.key_stream(key, c1, c2, y1, y2)
        original_values = []
        cipher_values = []
        cipher_text = ""
        c1_prime, c2_prime = key_results[14], key_results[15]

        # encryption operation
        y = [y1_prime, y2_prime]
        for char in plain_text:
            original_values.append(ord(char))
            y_n = round(_y_equation(
                ord(char), c1_prime, c2_prime, y[0], y[1]))
            cipher_values.append(y_n)

            y[1], y[0] = y[0], y_n

            encoded_char = chr(y_n)
            cipher_text += encoded_char

        success = 1
        return key_results, original_values, cipher_values, cipher_text, success

    def decrypt(self, cipher_text, c1_prime, c2_prime, y1_prime, y2_prime):
        decrypt_values = []
        decrypted_text = ""
        # not important (used to pass to frontend only)
        cipher_values = [ord(char) for char in cipher_text]

        # decryption operation
        y = [y1_prime, y2_prime]
        for cipher_char in cipher_text:
            x_n = round(_x_equation(ord(cipher_char),
                        c1_prime, c2_prime, y[0], y[1]))
            decrypt_values.append(x_n)

            y[1], y[0] = y[0], ord(cipher_char)

            encoded_char = chr(x_n)
            decrypted_text += encoded_char

        success = 1
        return decrypt_values, decrypted_text, cipher_values, success
