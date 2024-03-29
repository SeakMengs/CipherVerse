import TextDecryptForm from "@/components/custom/TextDecryptForm";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useTextCipher } from "@/hooks/useTextCipher";
import { parseStdOut } from "@/lib/parse";
import { RUNNING_IN_TAURI, isSideCarReady } from "@/lib/utils";
import { CryptoFormType } from "@/types/form";
import { listen } from "@tauri-apps/api/event";
import { memo, useEffect } from "react";

const TextDecrypt = memo(() => {
    const { textDecrypted, setTextDecrypted } = useTextCipher();
    const { toast } = useToast();

    useEffect(() => {
        if (!RUNNING_IN_TAURI) {
            console.log('Not running in tauri, skipping event listener');
            return;
        }

        const unlisten = listen<string>('cipher_verse_message', (event) => {
            console.log('Received event:', event.payload);

            const { sideCarReady, stdout } = isSideCarReady(event.payload, CryptoFormType.TextDecrypt);
            if (sideCarReady) {
                type TextDecryptResult = {
                    decryptValues: number[],
                    cipherValues: number[],
                    success: boolean,
                }

                const result = parseStdOut<TextDecryptResult>(stdout);

                if (!result.success) {
                    toast({
                        title: 'Error',
                        description: 'An error occurred while decrypting the text',
                    });
                    return;
                }

                setTextDecrypted({
                    plainText: result.decryptValues.map((v) => String.fromCharCode(v)).join(''),
                    cipherText: result.cipherValues.map((v) => String.fromCharCode(v)).join(''),
                })
            }
        });

        return () => {
            unlisten.then(f => f());
        };
    }, [])

    return (
        <>
            <div className="w-full temp-max-w-screen-md m-auto flex flex-col px-5">
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
                            <p className="text-sm break-words break-all">
                                {textDecrypted.plainText}
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <p className="text-sm text-nowrap text-green-300">
                                Cipher Text:
                            </p>
                            <p className="text-sm break-words break-all">
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