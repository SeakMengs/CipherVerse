import { IconVideo } from "@tabler/icons-react";
import EncryptOrDecrypt from "./EncryptOrDecrypt";
import VideoEncrypt from "./encrypt/VideoEncrypt";
import VideoDecrypt from "./decrypt/VideoDecrypt";
import { memo } from "react";

const Video  = memo(() => {

    return (
        <>
            <EncryptOrDecrypt
                Icon={IconVideo}
                label="Video Encryption & Decryption"
                EncryptContent={<VideoEncrypt />}
                DecryptContent={<VideoDecrypt />}
            />
        </>
    )
});

export default Video ;