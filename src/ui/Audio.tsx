import { IconFileMusic } from "@tabler/icons-react";
import EncryptOrDecrypt from "../components/custom/EncryptOrDecrypt";
import AudioEncrypt from "./encrypt/AudioEncrypt";
import AudioDecrypt from "./decrypt/AudioDecrypt";
import { memo } from "react";
import { FileType, useFileCipher } from "@/hooks/useFileCipher";

const Audio = memo(() => {
    const { notSameTypeResetState } = useFileCipher();
    notSameTypeResetState(FileType.Audio);

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