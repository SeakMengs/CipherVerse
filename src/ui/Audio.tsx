import { IconFileMusic } from "@tabler/icons-react";
import EncryptOrDecrypt from "./EncryptOrDecrypt";
import AudioEncrypt from "./encrypt/AudioEncrypt";
import AudioDecrypt from "./decrypt/AudioDecrypt";
import { memo } from "react";

const Audio = memo(() => {

    return (
        <>
            <EncryptOrDecrypt
                Icon={IconFileMusic}
                label="Audio Encryption & Decryption"
                EncryptContent={<AudioEncrypt />}
                DecryptContent={<AudioDecrypt />}
            />
        </>
    )
});

export default Audio;