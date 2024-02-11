import cv2
import numpy as np

# Function to encrypt a frame
def encrypt_frame(frame, key):
    return cv2.bitwise_xor(frame, key)

# Function to decrypt a frame
def decrypt_frame(frame, key):
    return cv2.bitwise_xor(frame, key)

# Read the video file
video_capture = cv2.VideoCapture("videos\lucky 1 tap - Copy.mp4")

# Get video properties
frame_width = int(video_capture.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(video_capture.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = int(video_capture.get(cv2.CAP_PROP_FPS))
total_frames = int(video_capture.get(cv2.CAP_PROP_FRAME_COUNT))

# Generate a random encryption key
encryption_key = np.random.randint(0, 256, (frame_height, frame_width, 3), dtype=np.uint8)

# Create VideoWriter object to save encrypted video
out_encrypted = cv2.VideoWriter('videos\encrypted_video.avi', cv2.VideoWriter_fourcc(*'FFV1'), fps, (frame_width, frame_height))

# Loop through each frame to encrypt and save
for _ in range(total_frames):
    ret, frame = video_capture.read()
    if not ret:
        break

    # Encrypt frame
    encrypted_frame = encrypt_frame(frame, encryption_key)
    
    # Write encrypted frame to file
    out_encrypted.write(encrypted_frame)

# Release video capture and writer objects
video_capture.release()
out_encrypted.release()

# Read the encrypted video file
encrypted_video_capture = cv2.VideoCapture('videos\encrypted_video.avi')

# Create VideoWriter object to save decrypted video
out_decrypted = cv2.VideoWriter('videos\decrypted_video.avi', cv2.VideoWriter_fourcc(*'FFV1'), fps, (frame_width, frame_height))

# Loop through each frame to decrypt and save
for _ in range(total_frames):
    ret, encrypted_frame = encrypted_video_capture.read()
    if not ret:
        break

    # Decrypt frame
    decrypted_frame = decrypt_frame(encrypted_frame, encryption_key)

    # Write decrypted frame to file
    out_decrypted.write(decrypted_frame)

# Release video capture and writer objects
encrypted_video_capture.release()
out_decrypted.release()

# Close all OpenCV windows
cv2.destroyAllWindows()
