from modules import CipherVerseText, CipherVerseAudio, CipherVerseImage, CipherVerseVideo

if __name__ == '__main__':
    debugText = False
    debugImage = False
    debugVideo = False
    debugAudio = False

    if debugText:
        cvt = CipherVerseText()
        input = "ÿÿÿĀdddddddddddddddddddddddd"
        # input = "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        # key = "asdbgffdmsestuiu"
        # y1_prime = 0.492
        # y2_prime = -0.133
        # c1 = -0.3
        # c2 = 0.3
        # y1 =  0.492
        # y2 = -0.133
        key = "asdbgffdmsestuiu"
        y1_prime = 0.99
        y2_prime = 0.16
        c1 = 0.5
        c2 = 0.25
        y1 = 0.25
        y2 = 0.02

        key_results, original_values, cipher_values, cipher_text, success = cvt.encrypt(
            key=key, plain_text=input, c1=c1, c2=c2, y1=y1, y2=y2, y1_prime=y1_prime, y2_prime=y2_prime)
        print(f"Input: {input}")
        print(f"Cipher Text: {cipher_text}")
        print(f"C1_prim {key_results[14]}, C2_prim {key_results[15]}")
        decrypt_values, decrypted_text, cipher_values, success = cvt.decrypt(
            cipher_text=cipher_text, c1_prime=key_results[14], c2_prime=key_results[15], y1_prime=y1_prime, y2_prime=y2_prime)
        print(f"Decrypted Text: {decrypted_text}")

        assert input == decrypted_text

    if debugImage:
        cvi = CipherVerseImage()
        input = "../playground/images/plain_image/fight back to school 02.jpg"
        output = "../playground/images/encrypted/encrypted.jpg"
        decrypt_output = "../playground/images/decrypted/decrypted.jpg"
        key = "asdbgffdmsestuiu"
        y1_prime = 0.99
        y2_prime = 0.16
        c1 = 0.5
        c2 = 0.25
        y1 = 0.25
        y2 = 0.02
        key_results, cipher_image_output_path, plain_image_path, success = cvi.encrypt(
            key=key, c1=c1, c2=c2, y1=y1, y2=y2, y1_prime=y1_prime, y2_prime=y2_prime, plain_image_path=input, cipher_image_output_path=output)
        plain_image_output_path, cipher_image_path, success = cvi.decrypt(
            c1_prime=key_results[14], c2_prime=key_results[15], y1_prime=y1_prime, y2_prime=y2_prime, cipher_image_path=cipher_image_output_path, plain_image_output_path=decrypt_output)

    if debugVideo:
        cvv = CipherVerseVideo()
        input = "../playground/videos/lucky 1 tap.mp4"
        output = "../playground/videos/lucky 1 tap_encrypted.mp4"
        output_decrypted = "../playground/videos/lucky 1 tap_decrypted.mp4"
        key = "asdbgffdmsestuiu"
        y1_prime = 0.99
        y2_prime = 0.16
        c1 = 0.5
        c2 = 0.25
        y1 = 0.25
        y2 = 0.02
        plain_video_path, cipher_video_output_path, key_results, success = cvv.encrypt(
            key, input, output, c1, c2, y1, y2, y1_prime, y2_prime)
        plain_video_output_path, cipher_video_path, success = cvv.decrypt(
            c1_prime=key_results[14], c2_prime=key_results[15], y1_prime=y1_prime, y2_prime=y2_prime, cipher_video_path=cipher_video_output_path, plain_video_output_path=output_decrypted)

    if debugAudio:
        cva = CipherVerseAudio()
        key = "asdbgffdmsestuiu"
        y1_prime = 0.99
        y2_prime = 0.16
        c1 = 0.5
        c2 = 0.25
        y1 = 0.1
        y2 = 0.02
        input = "../playground/audios/5sec.mp3"
        output = "../playground/audios/5sec_encrypted"
        decrypt_output = "../playground/audios/5sec_decrypted.mp3"
        output_path, key_results, success = cva.encrypt(key=key, c1=c1, c2=c2, y1=y1, y2=y2, y1_prime=y1_prime,
                                               y2_prime=y2_prime, plain_audio_path=input, cipher_audio_output_path=output)
        decrypted_output, success = cva.decrypt(c1_prime=key_results[14], c2_prime=key_results[15], y1_prime=y1_prime,
                    y2_prime=y2_prime, cipher_audio_path=output_path, plain_audio_output_path=decrypt_output)
