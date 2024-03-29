from .utils import CipherVerseUtils, _x_equation, _y_equation

import cv2
import numpy as np
from numba import jit


@jit(nopython=True)
def encrypt_frame(frame, c1_prime, c2_prime, y1_prime, y2_prime):
    encrypted_frame = np.zeros(frame.shape, dtype=np.uint8)
    for i, row in enumerate(frame):
        for j, intensity in enumerate(row):
            # update y1_prime and y2_prime for each pixel
            if j == 0:
                # array fill with y1,y2 depends on the number of channels in the image
                _y1_prime = np.full(intensity.shape, y1_prime, dtype=np.uint8)
                _y2_prime = np.full(intensity.shape, y2_prime, dtype=np.uint8)
            elif j == 1:
                _y2_prime = _y1_prime
                _y1_prime = encrypted_frame[i, 0]
            else:
                _y1_prime = encrypted_frame[i, j - 1]
                _y2_prime = encrypted_frame[i, j - 2]

            encrypted_frame[i][j] = _y_equation(
                intensity, c1_prime, c2_prime, _y1_prime, _y2_prime)

    return encrypted_frame


@jit(nopython=True)
def decrypt_frame(frame, c1_prime, c2_prime, y1_prime, y2_prime):
    decrypted_frame = np.zeros(frame.shape, dtype=np.uint8)
    for i, row in enumerate(frame):
        for j, intensity in enumerate(row):
            # update y1_prime and y2_prime for each pixel
            if j == 0:
                # array fill with y1,y2 depends on the number of channels in the image
                _y1_prime = np.full(intensity.shape, y1_prime, dtype=np.uint8)
                _y2_prime = np.full(intensity.shape, y2_prime, dtype=np.uint8)
            elif j == 1:
                _y2_prime = _y1_prime
                _y1_prime = frame[i, 0]
            else:
                _y1_prime = frame[i, j - 1]
                _y2_prime = frame[i, j - 2]

            decrypted_frame[i][j] = _x_equation(
                intensity, c1_prime, c2_prime, _y1_prime, _y2_prime)

    return decrypted_frame


class CipherVerseImage(CipherVerseUtils):
    def encrypt(self, key, c1, c2, y1, y2, y1_prime, y2_prime, plain_image_path=None, cipher_image_output_path=None, frame=None, c1_prime=None, c2_prime=None):
        debug = False

        if debug:
            print(f"Argument: key: {key}, c1: {c1}, c2: {c2}, y1: {y1}, y2: {y2}, y1_prime: {y1_prime}, y2_prime: {y2_prime}, plain_image_path: {plain_image_path}, cipher_image_output_path: {cipher_image_output_path}, frame: {frame}, c1_prime: {c1_prime}, c2_prime: {c2_prime}")

        if len(key) != 16:
            raise ValueError("Key must be exactly 16 characters long")

        key_results = []

        if c1_prime is None or c2_prime is None:
            key_results = self.key_stream(key, c1, c2, y1, y2, type="file")
            c1_prime, c2_prime = key_results[14], key_results[15]
            if debug:
                print(
                    f"Debug From Image Encrypt: c1_prime: {c1_prime}, c2_prime: {c2_prime}")

        # since this class will also be used as a module in video encryption, we have check if the encryption
        # is for image where we have to read the image from the file system or for video where we have to pass the frame
        if plain_image_path is not None and cipher_image_output_path is not None and frame is None:
            frame = cv2.imread(plain_image_path)
            cipher_image_output_path = self.convert_file_extension(
                cipher_image_output_path, ".png")
            if debug:
                print(f"Debug: Image read from {plain_image_path}")

        # if debug:
        #     pass
            # print(
            #     f"Debug: Encrypted pixel at ({i}, {j}): {encrypted_image[i][j]} Original pixel: {intensity}")

        # using jit to compile the function to machine code for faster execution
        encrypted_image = encrypt_frame(
            frame, c1_prime, c2_prime, y1_prime, y2_prime)

        # if the encryption is for image where we have to write the encrypted image to the file system
        if plain_image_path is not None and cipher_image_output_path is not None:
            cv2.imwrite(cipher_image_output_path, encrypted_image,
                        [cv2.IMWRITE_PNG_COMPRESSION, 0])
            success = 1
            return key_results, cipher_image_output_path, plain_image_path, success

        # if the encryption is for video where we have to return the encrypted frame
        return encrypted_image, key_results

    def decrypt(self, c1_prime, c2_prime, y1_prime, y2_prime, cipher_image_path=None, plain_image_output_path=None, frame=None):
        debug = False

        if debug:
            print(f"Argument: c1_prime: {c1_prime}, c2_prime: {c2_prime}, y1_prime: {y1_prime}, y2_prime: {y2_prime}, cipher_image_path: {cipher_image_path}, plain_image_output_path: {plain_image_output_path}, frame: {frame}")

        if cipher_image_path is not None and plain_image_output_path is not None and frame is None:
            frame = cv2.imread(cipher_image_path)
            plain_image_output_path = self.convert_file_extension(
                plain_image_output_path, ".png")
            if debug:
                print(f"Debug: Image read from {cipher_image_path}")

        decrypted_image = decrypt_frame(
            frame, c1_prime, c2_prime, y1_prime, y2_prime)

        if cipher_image_path is not None and plain_image_output_path is not None:
            cv2.imwrite(plain_image_output_path, decrypted_image,
                        [cv2.IMWRITE_PNG_COMPRESSION, 0])
            success = 1
            return plain_image_output_path, cipher_image_path, success

        return decrypted_image
