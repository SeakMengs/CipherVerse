from modules import CipherVerseText, CipherVerseAudio, CipherVerseImage, CipherVerseVideo
import argparse


def main():
    parser = argparse.ArgumentParser(
        description='Perform operations in the Cipherverse.')
    subparsers = parser.add_subparsers(
        dest='command', help='The command to perform.')

    """
        Text
        Usage: python main.py text -type <encrypt/decrypt> -input <input_text> -key <key>
    """
    text_parser = subparsers.add_parser(
        'text', help='Perform encrypt and decrypt operations on text.')
    text_parser.add_argument(
        '-type', '-t', choices=['encrypt', 'decrypt'], help='The type of operation to perform.')
    text_parser.add_argument('-input', '-i', type=str, help='The input text.')
    text_parser.add_argument('-key', '-k', type=str,
                             help='The key to use for encryption/decryption.')

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
            cvt = CipherVerseText(args.input, args.key)
            cvt.encrypt()
            print(cvt.key, cvt.text)
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
            cvt = CipherVerseText(args.input, args.key)
            cvt.decrypt()
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
