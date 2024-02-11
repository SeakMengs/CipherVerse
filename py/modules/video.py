import cv2
from .image import CipherVerseImage
from .utils import CipherVerseUtils

class CipherVerseVideo(CipherVerseUtils):
    def encrypt(self, key, plain_video_path, cipher_video_output_path, c1, c2, y1, y2, y1_prime, y2_prime):
        # print(f"Encrypting video {plain_video_path} to {cipher_video_output_path} with key {key} and c1 {c1} c2 {c2} y1 {y1} y2 {y2} y1_prime {y1_prime} y2_prime {y2_prime}")

        key_results = []
        c1_prime, c2_prime = None, None
        encrypted_video_frame = []

        cap = cv2.VideoCapture(plain_video_path)

        if not cap.isOpened():
            print("Error: Could not open video.")
            exit()

        cipher_video_output_path = self.convert_file_extension(
            cipher_video_output_path, ".avi")

        # Get video properties
        fps = cap.get(cv2.CAP_PROP_FPS)
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        current_frame = 0
        # fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        fourcc = cv2.VideoWriter_fourcc(*'FFV1')
        output_video = cv2.VideoWriter(
            cipher_video_output_path, fourcc, fps, (width, height))
        cvi = CipherVerseImage()

        while cap.isOpened():
            # Read a frame from the video
            ret, frame = cap.read()

            if not ret:
                break

            cipher_frame, _key_results = cvi.encrypt(
                key=key, frame=frame, c1=c1, c2=c2, y1=y1, y2=y2, y1_prime=y1_prime, y2_prime=y2_prime, c1_prime=c1_prime, c2_prime=c2_prime)
            
            # optimize because we don't want to generate key results for every frame since it's the same for all frames
            if c1_prime is None or c2_prime is None:
                key_results = _key_results
                c1_prime, c2_prime = key_results[14], key_results[15]

            # Write the frame to the output video
            output_video.write(cipher_frame)
            encrypted_video_frame.append(cipher_frame)

            # Print progress
            current_frame += 1
            progress_percentage = (current_frame / total_frames) * 100
            print(
                f"Processing frame {current_frame}/{total_frames} - {progress_percentage:.2f}% complete", flush=True)

        # Release the video capture and writer objects
        cap.release()
        output_video.release()
        success = 1

        # temporary function to decrypt video by frames because the decrypt function write to file has compression issue
        # self.decrypt_video_by_frames(c1_prime, c2_prime, y1_prime, y2_prime, encrypted_video_frame)
        
        return plain_video_path, cipher_video_output_path, key_results, success

    def decrypt(self, c1_prime, c2_prime, y1_prime, y2_prime, cipher_video_path=None, plain_video_output_path=None):
        # print(f"Decrypting video {cipher_video_path} to {plain_video_output_path} with c1_prime {c1_prime} c2_prime {c2_prime} y1_prime {y1_prime} y2_prime {y2_prime}")

        cap = cv2.VideoCapture(cipher_video_path)

        if not cap.isOpened():
            print("Error: Could not open video.")
            exit()

        plain_video_output_path = self.convert_file_extension(
            plain_video_output_path, ".avi")

        # Get video properties
        fps = cap.get(cv2.CAP_PROP_FPS)
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        current_frame = 0
        # fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        fourcc = cv2.VideoWriter_fourcc(*'FFV1')
        output_video = cv2.VideoWriter(
            plain_video_output_path, fourcc, fps, (width, height))
        cvi = CipherVerseImage()

        while cap.isOpened():
            # Read a frame from the video
            ret, frame = cap.read()

            if not ret:
                break

            # Decrypt the frame
            decrypted_frame = cvi.decrypt(
                c1_prime=c1_prime, c2_prime=c2_prime, y1_prime=y1_prime, y2_prime=y2_prime, frame=frame)

            # for testing purposes
            # cv2.imshow('decrypted', decrypted_frame)
            # cv2.waitKey(0)
            
            # Write the frame to the output video
            output_video.write(decrypted_frame)

            # Print progress
            current_frame += 1
            progress_percentage = (current_frame / total_frames) * 100
            print(
                f"Processing frame {current_frame}/{total_frames} - {progress_percentage:.2f}% complete")

        # Release the video capture and writer objects
        cap.release()
        output_video.release()
        success = 1

        return plain_video_output_path, cipher_video_path, success
    
    # Temporary function to decrypt video by frames because the decrypt function write to file has compression issue
    def decrypt_video_by_frames(self, c1_prime, c2_prime, y1_prime, y2_prime, encrypted_video_frames):
        decrypted_video_frames = []
        cvi = CipherVerseImage()

        for  i,frame in enumerate(encrypted_video_frames):
            decrypted_frame = cvi.decrypt(
                c1_prime=c1_prime, c2_prime=c2_prime, y1_prime=y1_prime, y2_prime=y2_prime, frame=frame)
            decrypted_video_frames.append(decrypted_frame)
            cv2.imwrite(f"../playground/videos/lucky 1 tap_decrypted-{i}.png", decrypted_frame, [cv2.IMWRITE_PNG_COMPRESSION,0])
        
        return decrypted_video_frames
