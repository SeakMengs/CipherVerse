import { IconPhoto } from "@tabler/icons-react";
import EncryptOrDecrypt from "../components/custom/EncryptOrDecrypt";
import ImageEncrypt from "./encrypt/ImageEncrypt";
import ImageDecrypt from "./decrypt/ImageDecrypt";
import { memo } from "react";
import { FileType, useFileCipher } from "@/hooks/useFileCipher";

const Image = memo(() => {
    const { notSameTypeResetState } = useFileCipher();
    notSameTypeResetState(FileType.Image);

    return (
        <>
            <EncryptOrDecrypt
                Icon={IconPhoto}
                label="Image Encryption & Decryption"
                EncryptContent={<ImageEncrypt />}
                DecryptContent={<ImageDecrypt />}
            />
        </>
    )
});

export default Image;