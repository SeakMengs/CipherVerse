import TextDecryptForm from "@/components/custom/TextDecryptForm";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTextCipher } from "@/hooks/useTextCipher";
import { parseStdOut } from "@/lib/parse";
import { RUNNING_IN_TAURI } from "@/lib/utils";
import { PyMessageIdentifier } from "@/types/event";
import { CryptoFormType } from "@/types/form";
import { listen } from "@tauri-apps/api/event";
import { memo, useEffect } from "react";

const TextDecrypt = memo(() => {
    const { textDecrypted, setTextDecrypted } = useTextCipher();
    useEffect(() => {
        if (!RUNNING_IN_TAURI) {
            console.log('Not running in tauri, skipping event listener');
            return;
        }

        const unlisten = listen<string>('cipher_verse_message', (event) => {
            console.log('Received event:', event.payload);

            const splitPayload = event.payload.split('-splitter');
            if (splitPayload[0] === PyMessageIdentifier.ResultTextDecrypt) {
                type TextDecryptResult = {
                    "decrypt_values": number[],
                    "cipher_values": number[],
                }

                const result = parseStdOut<TextDecryptResult>(splitPayload[1]);

                setTextDecrypted({
                    plainText: result.decrypt_values.map((v) => String.fromCharCode(v)).join(''),
                    cipherText: result.cipher_values.map((v) => String.fromCharCode(v)).join(''),
                })
            }
        });

        return () => {
            unlisten.then(f => f());
        };
    }, [])

    return (
        <>
            <div className="w-full h-[full] m-auto flex flex-col px-5">
                <div className="p-6">
                    <TextDecryptForm inputLabel="Cipher Text" formType={CryptoFormType.TextDecrypt} />
                    <Separator className="my-3" />
                    <div className="flex justify-center m-2">
                        <Label>Output</Label>
                    </div>
                    <div className="text-wrap">
                        <div className="flex gap-1">
                            <p className="text-sm text-nowrap text-green-300">
                                Plain Text:
                            </p>
                            <p className="text-sm">
                                {textDecrypted.plainText}
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <p className="text-sm text-nowrap text-green-300">
                                Cipher Text:
                            </p>
                            <p className="text-sm">
                                {textDecrypted.cipherText}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default TextDecrypt;