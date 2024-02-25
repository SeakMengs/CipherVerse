from modules import CipherVerseText, CipherVerseAudio, CipherVerseImage, CipherVerseVideo
import argparse


def parse_text_arguments(parser):
    parser.add_argument(
        '-type', '-t', choices=['encrypt', 'decrypt'], help='The type of operation to perform.')
    parser.add_argument('-input', '-i', type=str, help='The input text.')
    parser.add_argument('-key', '-k', type=str,
                        help='The key to use for encryption/decryption.')
    parser.add_argument('-c1', type=float,
                        help='The c1 value to use for encryption/decryption.')
    parser.add_argument('-c2', type=float,
                        help='The c2 value to use for encryption/decryption.')
    parser.add_argument('-y1', type=float,
                        help='The y1 value to use for encryption/decryption.')
    parser.add_argument('-y2', type=float,
                        help='The y2 value to use for encryption/decryption.')
    parser.add_argument('-y1_prime', type=float,
                        help='The y1_prime value to use for encryption/decryption.')
    parser.add_argument('-y2_prime', type=float,
                        help='The y2_prime value to use for encryption/decryption.')
    parser.add_argument('-c1_prime', type=float,
                        help='The c1_prime value to use for encryption/decryption.')
    parser.add_argument('-c2_prime', type=float,
                        help='The c2_prime value to use for encryption/decryption.')


def parse_file_arguments(parser):
    parser.add_argument(
        '-type', '-t', choices=['encrypt', 'decrypt'], help='The type of operation to perform.')
    parser.add_argument('-input', '-i', type=str,
                        help='The input audio file path.')
    parser.add_argument('-output', '-o', type=str,
                        help='The output audio file path.')
    parser.add_argument('-key', '-k', type=str,
                        help='The key to use for encryption/decryption.')
    parser.add_argument('-c1', type=float,
                        help='The c1 value to use for encryption/decryption.')
    parser.add_argument('-c2', type=float,
                        help='The c2 value to use for encryption/decryption.')
    parser.add_argument('-y1', type=float,
                        help='The y1 value to use for encryption/decryption.')
    parser.add_argument('-y2', type=float,
                        help='The y2 value to use for encryption/decryption.')
    parser.add_argument('-y1_prime', type=float,
                        help='The y1_prime value to use for encryption/decryption.')
    parser.add_argument('-y2_prime', type=float,
                        help='The y2_prime value to use for encryption/decryption.')
    parser.add_argument('-c1_prime', type=float,
                        help='The c1_prime value to use for encryption/decryption.')
    parser.add_argument('-c2_prime', type=float,
                        help='The c2_prime value to use for encryption/decryption.')


def handle_text(args):
    cvt = CipherVerseText()
    if args.type == 'encrypt':
        key_results, original_values, cipher_values, cipher_text, success = cvt.encrypt(
            key=args.key, plain_text=args.input, c1=args.c1, c2=args.c2, y1=args.y1, y2=args.y2, y1_prime=args.y1_prime, y2_prime=args.y2_prime)
        print("text-encrypt-splitter", {
            "keyResults": key_results,
            "originalValues": original_values,
            "cipherValues": cipher_values,
            "success": success,
        })
    elif args.type == 'decrypt':
        decrypt_values, decrypted_text, cipher_values, success = cvt.decrypt(
            cipher_text=args.input, c1_prime=args.c1_prime, c2_prime=args.c2_prime, y1_prime=args.y1_prime, y2_prime=args.y2_prime)
        print("text-decrypt-splitter", {
            "decryptValues": decrypt_values,
            "cipherValues": cipher_values,
            "success": success,
        })


def handle_audio(args):
    cva = CipherVerseAudio()
    if args.type == 'encrypt':
        output_path, key_results, success = cva.encrypt(key=args.key, c1=args.c1, c2=args.c2, y1=args.y1, y2=args.y2, y1_prime=args.y1_prime,
                                                        y2_prime=args.y2_prime, plain_audio_path=args.input, cipher_audio_output_path=args.output)
        print("audio-encrypt-splitter", {
            "keyResults": key_results,
            "cipherAudioOutputFilePath": output_path,
            "plainAudioFilePath": args.input,
            "success": success,
        })
    elif args.type == 'decrypt':
        decrypted_output, success = cva.decrypt(c1_prime=args.c1_prime, c2_prime=args.c2_prime, y1_prime=args.y1_prime,
                                                y2_prime=args.y2_prime, cipher_audio_path=args.input, plain_audio_output_path=args.output)
        print("audio-decrypt-splitter", {
            "plainAudioOutputPath": decrypted_output,
            "cipherAudioFilePath": args.input,
            "success": success,
        })


def handle_image(args):
    cvi = CipherVerseImage()
    if args.type == 'encrypt':
        key_results, cipher_image_output_path, plain_image_path, success = cvi.encrypt(
            key=args.key, c1=args.c1, c2=args.c2, y1=args.y1, y2=args.y2, y1_prime=args.y1_prime, y2_prime=args.y2_prime, plain_image_path=args.input, cipher_image_output_path=args.output)
        print("image-encrypt-splitter", {
            "keyResults": key_results,
            "cipherImageOutputFilePath": cipher_image_output_path,
            "plainImageFilePath": plain_image_path,
            "success": success,
        })
    elif args.type == 'decrypt':
        plain_image_output_path, cipher_image_path, success = cvi.decrypt(c1_prime=args.c1_prime, c2_prime=args.c2_prime,
                                                                          y1_prime=args.y1_prime, y2_prime=args.y2_prime, cipher_image_path=args.input, plain_image_output_path=args.output)
        print("image-decrypt-splitter", {
            "plainImageOutputPath": plain_image_output_path,
            "cipherImageFilePath": cipher_image_path,
            "success": success,
        })


def handle_video(args):
    cvv = CipherVerseVideo()
    if args.type == 'encrypt':
        plain_video_path, cipher_video_output_path, key_results, success = cvv.encrypt(
            args.key, args.input, args.output, args.c1, args.c2, args.y1, args.y2, args.y1_prime, args.y2_prime)
        print("video-encrypt-splitter", {
            "plainVideoFilePath": plain_video_path,
            "cipherVideoOutputFilePath": cipher_video_output_path,
            "keyResults": key_results,
            "success": success,
        })
    elif args.type == 'decrypt':
        plain_video_output_path, cipher_video_path, success = cvv.decrypt(
            c1_prime=args.c1_prime, c2_prime=args.c2_prime, y1_prime=args.y1_prime, y2_prime=args.y2_prime, cipher_video_path=args.input, plain_video_output_path=args.output)
        print("video-decrypt-splitter", {
            "plainVideoOutputPath": plain_video_output_path,
            "cipherVideoFilePath": cipher_video_path,
            "success": success,
        })


def main():
    parser = argparse.ArgumentParser(
        description='Perform operations in the Cipherverse.')
    subparsers = parser.add_subparsers(
        dest='command', help='The command to perform.')

    """
        Text
        Usage: python main.py text -t encrypt -i "hello" -k 1234567891234567 -c1 0.4 -c2 0.4 -y1 0.4 -y2 0.4 -y1_prime 0.4 -y2_prime 0.4
        Decrypt: python main.py text -t decrypt -i ojÔÇġĦŮ -c1_prime 0.08126961194545856 -c2_prime 0.8021330514802685 -y1_prime 0.242 -y2_prime -0.955
    """
    text_parser = subparsers.add_parser(
        'text', help='Perform encrypt and decrypt operations on text.')
    parse_text_arguments(text_parser)

    """
        Audio
        Usage: python main.py audio -type encrypt -input "../playground/audios/5sec.mp3" -output "../playground/audios/5sec_encrypted.wav" -key "asdbgffdmsestuiu" -c1 0.5 -c2 0.25 -y1 0.25 -y2 0.02 -y1_prime 0.99 -y2_prime 0.16
        Decrypt: python main.py audio -type decrypt -input "../playground/audios/5sec_encrypted.wav" -output "../playground/audios/5sec_decrypted.wav" -key "asdbgffdmsestuiu" -c1_prime -0.6797836303710909 -c2_prime 0.8414782714843625 -y1_prime 0.99 -y2_prime 0.16
    """
    audio_parser = subparsers.add_parser(
        'audio', help='Perform encrypt and decrypt operations on audio.')
    parse_file_arguments(audio_parser)

    """
        Image
        Usage: python main.py image -type <encrypt/decrypt> -input <input_image_path> -key <key>
    """
    image_parser = subparsers.add_parser(
        'image', help='Perform encrypt and decrypt operations on image.')
    parse_file_arguments(image_parser)

    """
        Video
        Usage: python main.py video -type <encrypt/decrypt> -input <input_video_path> -key <key>
    """
    video_parser = subparsers.add_parser(
        'video', help='Perform encrypt and decrypt operations on video.')
    parse_file_arguments(video_parser)

    args = parser.parse_args()

    if args.command == 'text':
        handle_text(args)
    elif args.command == 'audio':
        handle_audio(args)
    elif args.command == 'image':
        handle_image(args)
    elif args.command == 'video':
        handle_video(args)


# python main.py --help to see the usage of the script
if __name__ == '__main__':
    print("Starting CipherVerse...")
    main()
