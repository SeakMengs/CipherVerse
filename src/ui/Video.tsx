import { IconVideo } from "@tabler/icons-react";
import EncryptOrDecrypt from "../components/custom/EncryptOrDecrypt";
import VideoEncrypt from "./encrypt/VideoEncrypt";
import VideoDecrypt from "./decrypt/VideoDecrypt";
import { memo } from "react";
import { FileType, useFileCipher } from "@/hooks/useFileCipher";

const Video = memo(() => {
    const { notSameTypeResetState } = useFileCipher();
    notSameTypeResetState(FileType.Video);

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

export default Video;