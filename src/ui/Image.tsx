import { IconPhoto } from "@tabler/icons-react";
import EncryptOrDecrypt from "../components/custom/EncryptOrDecrypt";
import ImageEncrypt from "./encrypt/ImageEncrypt";
import ImageDecrypt from "./decrypt/ImageDecrypt";
import { memo } from "react";

const Image = memo(() => {

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