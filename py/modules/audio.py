import soundfile as sf
import numpy as np
from .utils import CipherVerseUtils, _y_equation, _x_equation, _f
from numba import jit


@jit(nopython=True)
def encrypt_audio(y1_prime, y2_prime, c1_prime, c2_prime, audio):
    encrypted_audio = np.zeros(audio.shape[0], dtype=np.float32)
    for i, audio_data in enumerate(audio):
        if i == 0:
            _y1_prime = y1_prime
            _y2_prime = y2_prime
        elif i == 1:
            _y2_prime = y1_prime
            _y1_prime = encrypted_audio[i - 1]
        else:
            _y1_prime = encrypted_audio[i - 1]
            _y2_prime = encrypted_audio[i - 2]

        # using f function to prevent overflow making the result always 1 or -1
        # if not use, the result can be inf or -inf which make output audio no sound
        encrypted_audio[i] = _f(_y_equation(
            audio_data, c1_prime, c2_prime, _y1_prime, _y2_prime))

    return encrypted_audio


@jit(nopython=True)
def decrypt_audio(y1_prime, y2_prime, c1_prime, c2_prime, audio):
    decrypted_audio = np.zeros(audio.shape[0], dtype=np.float32)
    for i, audio_data in enumerate(audio):
        if i == 0:
            _y1_prime = y1_prime
            _y2_prime = y2_prime
        elif i == 1:
            _y2_prime = y1_prime
            _y1_prime = audio[i - 1]
        else:
            _y1_prime = audio[i - 1]
            _y2_prime = audio[i - 2]

        decrypted_audio[i] = _f(_x_equation(
            audio_data, c1_prime, c2_prime, _y1_prime, _y2_prime))

    return decrypted_audio


class CipherVerseAudio(CipherVerseUtils):
    def encrypt(self, key, c1, c2, y1, y2, y1_prime, y2_prime, plain_audio_path, cipher_audio_output_path):
        if len(key) != 16:
            raise ValueError("Key must be exactly 16 characters long")

        if len(plain_audio_path) < 1:
            raise ValueError("Plain audio path must not be empty")

        key_results = self.key_stream(key, c1, c2, y1, y2, type='file')
        c1_prime, c2_prime = key_results[14], key_results[15]
        print(f"C1 Prime: {c1_prime}, C2 Prime: {c2_prime}")

        # Read the audio file
        audio, sample_rate = sf.read(plain_audio_path)

        # soundfile read 2D array, we convert to 1d
        audio_1d = audio
        if audio.ndim == 2:
            audio_1d = audio[:, 0]

        encrypted_audio = encrypt_audio(
            y1_prime, y2_prime, c1_prime, c2_prime, audio_1d)
        output_path = self.convert_file_extension(
            cipher_audio_output_path, '.wav')

        # Save the encrypted audio
        sf.write(file=output_path,
                 data=encrypted_audio, samplerate=sample_rate, format='wav')

        success = 1
        return output_path, key_results, success

    def decrypt(self, c1_prime, c2_prime, y1_prime, y2_prime, cipher_audio_path, plain_audio_output_path):
        # Read the audio file
        audio, sample_rate = sf.read(cipher_audio_path)

        audio_1d = audio
        if audio.ndim == 2:
            audio_1d = audio[:, 0]

        decrypted_audio = decrypt_audio(
            y1_prime, y2_prime, c1_prime, c2_prime, audio_1d)
        output_path = self.convert_file_extension(
            plain_audio_output_path, '.wav')

        # Save the decrypted audio
        sf.write(file=output_path,
                 data=decrypted_audio, samplerate=sample_rate, format='wav')

        success = 1
        return output_path, success
