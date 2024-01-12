import { IconTextSize } from "@tabler/icons-react";
import EncryptOrDecrypt from "./EncryptOrDecrypt";
import TextEncrypt from "./encrypt/TextEncrypt";
import TextDecrypt from "./decrypt/TextDecrypt";
import { memo } from "react";

const Text = memo(() => {

    return (
        <>
            <EncryptOrDecrypt
                Icon={IconTextSize}
                label="Text Encryption & Decryption"
                EncryptContent={<TextEncrypt />}
                DecryptContent={<TextDecrypt />}
            />
        </>
    )
});

export default Text;