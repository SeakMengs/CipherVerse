import imageio
import numpy as np
from numba import jit

key = []

@jit(nopython=True)
def encrypt_frame(image, key):
    encrypted_image = np.zeros(image.shape, dtype=np.uint8)

    if image.shape != key.shape:
        key = np.resize(key, image.shape)

    for i, row in enumerate(image):
        for j, col in enumerate(row):
            # for grayscale image
            if len(image.shape) < 3:
                encrypted_image[i][j] = image[i][j] ^ key[i][j]
            else:
                # for bgr | rgb image
                # imread read color image as bgr
                B, G, R = image[i][j]
                B_Key, G_Key, R_Key = key[i][j]
                encrypted_image[i][j] = [B ^ B_Key, G ^ G_Key, R ^ R_Key]

    return encrypted_image


@jit(nopython=True)
def decrypt_frame(encrypted_image, key):
    decrypted_image = np.zeros(encrypted_image.shape, dtype=np.uint8)

    if encrypted_image.shape != key.shape:
        key = np.resize(key, encrypted_image.shape)

    for i, row in enumerate(encrypted_image):
        for j, col in enumerate(row):
            if len(encrypted_image.shape) < 3:
                decrypted_image[i][j] = encrypted_image[i][j] ^ key[i][j]
            else:
                B, G, R = encrypted_image[i][j]
                B_Key, G_Key, R_Key = key[i][j]
                decrypted_image[i][j] = [B ^ B_Key, G ^ G_Key, R ^ R_Key]

    return decrypted_image


def generate_key(image):
    key = np.random.randint(0, 255, image.shape, dtype=np.uint8)
    return key


def encrypt_video(input_video_path, output_video_path):
    reader = imageio.get_reader(input_video_path)
    fps = reader.get_meta_data()['fps']
    writer = imageio.get_writer(
        output_video_path, fps=fps, quality=10, codec="ffv1")
    encryption_key = None

    for i, frame in enumerate(reader):
        if encryption_key is None:
            encryption_key = generate_key(frame)
            # save the key as an image
            imageio.imwrite("videos/key.png", encryption_key)

        print(f"Encrypting frame {i+1}")
        encrypted_frame = encrypt_frame(frame, encryption_key)
        writer.append_data(encrypted_frame)

    writer.close()
    print("Encryption complete.")


def decrypt_video(input_video_path, output_video_path, encryption_key):
    reader = imageio.get_reader(input_video_path)
    fps = reader.get_meta_data()['fps']
    writer = imageio.get_writer(
        output_video_path, fps=fps, quality=10, codec="ffv1")

    for i, frame in enumerate(reader):
        print(f"Decrypting frame {i+1}")
        decrypted_frame = decrypt_frame(frame, encryption_key)
        writer.append_data(decrypted_frame)

    writer.close()
    print("Decryption complete.")


# Example usage
input_video_path = "videos/lucky 1 tap - Copy.mp4"
encrypted_video_path = 'videos/encrypted_video.avi'
decrypted_video_path = 'videos/decrypted_video.avi'
key_image_path = "videos/key.png"

# Encrypt the video
encrypt_video(input_video_path, encrypted_video_path)

# Decrypt the video
read_key = imageio.imread(key_image_path)
decrypt_video(encrypted_video_path, decrypted_video_path, read_key)
