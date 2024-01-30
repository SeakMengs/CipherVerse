import cv2
class CipherVerseVideo:
    def __init__(self, path, output, key):
        # self.path = path
        # self.output = output
        # self.key = key
        # self.encrypted_video = None
        pass
        
    def encrypt(self, key, plain_video_path, cipher_video_output_path, c1, c2, y1, y2, y1_prime, y2_prime):
        # print(f"Encrypting video {plain_video_path} to {cipher_video_output_path} with key {key} and c1 {c1} c2 {c2} y1 {y1} y2 {y2} y1_prime {y1_prime} y2_prime {y2_prime}")
        
        # temp
        key_results = []
        
        cap = cv2.VideoCapture(plain_video_path)

        if not cap.isOpened():
            print("Error: Could not open video.")
            exit()
        
        # Get video properties
        fps = cap.get(cv2.CAP_PROP_FPS)
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        current_frame = 0
        
        # Create a VideoWriter object to save the output
        # https://stackoverflow.com/questions/30103077/what-is-the-codec-for-mp4-videos-in-python-opencv
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        output_video = cv2.VideoWriter(cipher_video_output_path, fourcc, fps, (width, height))
        
        while cap.isOpened():
            # Read a frame from the video
            ret, frame = cap.read()
            
            if not ret:
                break

            # TODO: call module function from encrypt image
            # cipher_frame =
                
            # Write the frame to the output video
            output_video.write(frame)
            
            # Print progress
            current_frame += 1
            progress_percentage = (current_frame / total_frames) * 100
            print(f"Processing frame {current_frame}/{total_frames} - {progress_percentage:.2f}% complete")
        
        # Release the video capture and writer objects
        cap.release()
        output_video.release()
        success = 1
        
        return plain_video_path, cipher_video_output_path, key_results, success
    
    def decrypt(self):
        # TODO: Add decryption code here
        pass