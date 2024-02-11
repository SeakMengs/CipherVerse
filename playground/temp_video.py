import cv2
import numpy as np
from numba import jit

codec = cv2.VideoWriter_fourcc(*'FFV1')

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
    cv2.imwrite("videos/key.png", key, [cv2.IMWRITE_PNG_COMPRESSION, 0])
    return key

# Function to encrypt a video file


def encrypt_video(input_video_path, output_video_path):
    cap = cv2.VideoCapture(input_video_path)
    if not cap.isOpened():
        print("Error: Could not open input video file")
        return

    # Get video properties
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    encrypted_frames = []

    # Create VideoWriter object
    out = cv2.VideoWriter(output_video_path, codec, fps,
                          (frame_width, frame_height))
    i = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if ret:
            if i == 0:
                encryption_key = generate_key(frame)
                i += 1
                cv2.imwrite("videos/key.png", encryption_key)
                # temp_key = cv2.imread("videos/key.png", cv2.IMREAD_COLOR)
                # assert np.array_equal(encryption_key, temp_key)

            print(f"Encrypting frame")
            encrypted_frame = encrypt_frame(frame, encryption_key)
            encrypted_frames.append(encrypted_frame)
            out.write(encrypted_frame)
        else:
            break

    cap.release()
    out.release()
    # decrypt_by_frames(encrypted_frames, encryption_key)
    print("Encryption complete.")
    # decrypt_video(output_video_path, "videos/decrypted_video.avi", temp_key)

# Function to decrypt a video file

def decrypt_by_frames(frames, encryption_key):
    decrypted_frames = []
    for frame in frames:
        decrypted_frame = decrypt_frame(frame, encryption_key)
        decrypted_frames.append(decrypted_frame)
        cv2.imshow("Decrypted Frame", decrypted_frame)
        cv2.waitKey(0)

def decrypt_video(input_video_path, output_video_path, encryption_key):
    cap = cv2.VideoCapture(input_video_path)
    if not cap.isOpened():
        print("Error: Could not open input video file")
        return

    # Get video properties
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    # Create VideoWriter object
    out = cv2.VideoWriter(output_video_path, codec, fps,
                          (frame_width, frame_height))

    while cap.isOpened():
        ret, frame = cap.read()
        if ret:
            print(f"Decrypting frame")
            decrypted_frame = decrypt_frame(frame, encryption_key)
            out.write(decrypted_frame)
        else:
            break

    cap.release()
    out.release()
    print("Decryption complete.")


# Example usage
input_video_path = "videos\lucky 1 tap - Copy.mp4"
encrypted_video_path = 'videos\encrypted_video.avi'
decrypted_video_path = 'videos\decrypted_video.avi'
temp_key = cv2.imread("videos/key.png", cv2.IMREAD_COLOR)

# Encrypt the video
encrypt_video(input_video_path, encrypted_video_path)

# Decrypt the video
decrypt_video(encrypted_video_path, decrypted_video_path, temp_key)
