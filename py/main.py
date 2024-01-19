from modules import CipherVerseText, CipherVerseAudio, CipherVerseImage, CipherVerseVideo
import argparse


def main():
    parser = argparse.ArgumentParser(
        description='Perform operations in the Cipherverse.')
    subparsers = parser.add_subparsers(
        dest='command', help='The command to perform.')

    """
        Text
        Usage: python main.py text -t encrypt -i "hello" -k 1234567891234567 -c1 0.4 -c2 0.4 -y1 0.4 -y2 0.4 -y1_prime 0.4 -y2_prime 0.4
        Decrypt: python main.py text -t decrypt -i ojÔÇġĦŮ -c1_prime 0.08126961194545856 -c2_prime 0.8021330514802685 -y1_prime 0.242 -y2_prime -0.955
        Progress: done
    """
    text_parser = subparsers.add_parser(
        'text', help='Perform encrypt and decrypt operations on text.')
    text_parser.add_argument(
        '-type', '-t', choices=['encrypt', 'decrypt'], help='The type of operation to perform.')
    text_parser.add_argument('-input', '-i', type=str, help='The input text.')
    text_parser.add_argument('-key', '-k', type=str,
                             help='The key to use for encryption/decryption.')
    text_parser.add_argument('-c1', type=float,
                             help='The c1 value to use for encryption/decryption.')
    text_parser.add_argument('-c2', type=float,
                             help='The c2 value to use for encryption/decryption.')
    text_parser.add_argument('-y1', type=float,
                             help='The y1 value to use for encryption/decryption.')
    text_parser.add_argument('-y2', type=float,
                             help='The y2 value to use for encryption/decryption.')
    text_parser.add_argument('-y1_prime', type=float,
                             help='The y1_prime value to use for encryption/decryption.')
    text_parser.add_argument('-y2_prime', type=float,
                             help='The y2_prime value to use for encryption/decryption.')
    text_parser.add_argument('-c1_prime', type=float,
                             help='The c1_prime value to use for encryption/decryption.')
    text_parser.add_argument('-c2_prime', type=float,
                             help='The c2_prime value to use for encryption/decryption.')

    """
        Audio
        Usage: python main.py audio -type <encrypt/decrypt> -input <input_audio_path> -key <key>
    """
    audio_parser = subparsers.add_parser(
        'audio', help='Perform encrypt and decrypt operations on audio.')
    audio_parser.add_argument(
        '-type', '-t', choices=['encrypt', 'decrypt'], help='The type of operation to perform.')
    audio_parser.add_argument('-input', '-i', type=str,
                              help='The input audio file path.')
    audio_parser.add_argument('-output', '-o', type=str,
                              help='The output audio file path.')
    audio_parser.add_argument('-key', '-k', type=str,
                              help='The key to use for encryption/decryption.')

    """
        Image
        Usage: python main.py image -type <encrypt/decrypt> -input <input_image_path> -key <key>
    """
    image_parser = subparsers.add_parser(
        'image', help='Perform encrypt and decrypt operations on image.')
    image_parser.add_argument(
        '-type', '-t', choices=['encrypt', 'decrypt'], help='The type of operation to perform.')
    image_parser.add_argument('-input', '-i', type=str,
                              help='The input image file path.')
    image_parser.add_argument('-output', '-o', type=str,
                              help='The output image file path.')
    image_parser.add_argument('-key', '-k', type=str,
                              help='The key to use for encryption/decryption.')

    """
        Video
        Usage: python main.py video -type <encrypt/decrypt> -input <input_video_path> -key <key>
    """
    video_parser = subparsers.add_parser(
        'video', help='Perform encrypt and decrypt operations on video.')
    video_parser.add_argument(
        '-type', '-t', choices=['encrypt', 'decrypt'], help='The type of operation to perform.')
    video_parser.add_argument('-input', '-i', type=str,
                              help='The input video file path.')
    video_parser.add_argument('-output', '-o', type=str,
                              help='The output video file path.')
    video_parser.add_argument('-key', '-k', type=str,
                              help='The key to use for encryption/decryption.')

    args = parser.parse_args()

    if args.type == 'encrypt':
        if args.command == 'text':
            cvt = CipherVerseText()
            key_results, original_values, cipher_values, cipher_text = cvt.encrypt(
                key=args.key, plain_text=args.input, c1=args.c1, c2=args.c2, y1=args.y1, y2=args.y2, y1_prime=args.y1_prime, y2_prime=args.y2_prime)

            # This print will be used to get the result from subprocess
            print("result-text-encrypt-splitter", {
                "key_results": key_results,
                "original_values": original_values,
                "cipher_values": cipher_values,
            })

            # decrypt_values, decrypted_text = cvt.decrypt(
            #     cipher_text=cipher_text, c1_prime=key_results[14], c2_prime=key_results[15], y1_prime=args.y1_prime, y2_prime=args.y2_prime)
            # print("Decrypted text: ", decrypted_text)
        elif args.command == 'audio':
            cva = CipherVerseAudio(args.input, args.output, args.key)
            cva.encrypt()
        elif args.command == 'image':
            cvi = CipherVerseImage(args.input, args.output, args.key)
            cvi.encrypt()
        elif args.command == 'video':
            cvv = CipherVerseVideo(args.input, args.output, args.key)
            cvv.encrypt()
    elif args.type == 'decrypt':
        if args.command == 'text':
            cvt = CipherVerseText()
            decrypt_values, decrypted_text, cipher_values = cvt.decrypt(cipher_text=args.input, c1_prime=args.c1_prime,
                                         c2_prime=args.c2_prime, y1_prime=args.y1_prime, y2_prime=args.y2_prime)
            print("result-text-decrypt-splitter", {
                "decrypt_values": decrypt_values,
                "cipher_values": cipher_values,
            })

        elif args.command == 'audio':
            cva = CipherVerseAudio(args.input, args.output, args.key)
            cva.decrypt()
        elif args.command == 'image':
            cvi = CipherVerseImage(args.input, args.output, args.key)
            cvi.decrypt()
        elif args.command == 'video':
            cvv = CipherVerseVideo(args.input, args.output, args.key)
            cvv.decrypt()


# run local
# python main.py --help to see the usage of the script
if __name__ == '__main__':
    print("Starting CipherVerse...")
    main()
