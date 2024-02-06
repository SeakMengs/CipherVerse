import TextEncryptForm from "@/components/custom/TextEncryptForm";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useTextCipher } from "@/hooks/useTextCipher";
import { parseStdOut } from "@/lib/parse";
import { RUNNING_IN_TAURI, isSideCarReady } from "@/lib/utils";
import { CryptoFormType } from "@/types/form";
import { listen } from "@tauri-apps/api/event";
import { memo, useEffect } from "react";

const TextEncrypt = memo(() => {
    const { textEncrypted, setTextEncrypted } = useTextCipher();
    const { toast } = useToast();

    useEffect(() => {
        if (!RUNNING_IN_TAURI) {
            console.log('Not running in tauri, skipping event listener');
            return;
        }

        const unlisten = listen<string>('cipher_verse_message', (event) => {
            console.log('Received event:', event.payload);

            const { sideCarReady, stdout } = isSideCarReady(event.payload, CryptoFormType.TextEncrypt);
            if (sideCarReady) {
                type TextEncryptResult = {
                    keyResults: number[],
                    originalValues: number[],
                    cipherValues: number[],
                    success: boolean,
                }

                const result = parseStdOut<TextEncryptResult>(stdout);

                if (!result.success) {
                    toast({
                        title: 'Error',
                        description: 'An error occurred while encrypting the text',
                    });
                    return;
                }

                setTextEncrypted({
                    cipherText: result.cipherValues.map((v) => String.fromCharCode(v)).join(''),
                    plainText: result.originalValues.map((v) => String.fromCharCode(v)).join(''),
                    c1Prime: result.keyResults[14],
                    c2Prime: result.keyResults[15],
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
                    <TextEncryptForm inputLabel="Plain Text" formType={CryptoFormType.TextEncrypt} />
                    <Separator className="my-3 max-w" />
                    <div className="flex justify-center m-2">
                        <Label>Output</Label>
                    </div>
                    <div className="text-wrap">
                        <div className="flex gap-1">
                            <p className="text-sm text-nowrap text-green-300">
                                Plain Text:
                            </p>
                            <p className="text-sm break-words break-all">
                                {textEncrypted.plainText}
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <p className="text-sm text-nowrap text-green-300">
                                Cipher Text:
                            </p>
                            <p className="text-sm break-words break-all">
                                {textEncrypted.cipherText}
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <p className="text-sm text-nowrap text-green-300">
                                C1:
                            </p>
                            <p className="text-sm break-words break-all">
                                {textEncrypted.c1Prime}
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <p className="text-sm text-nowrap text-green-300">
                                C2:
                            </p>
                            <p className="text-sm break-words break-all">
                                {textEncrypted.c2Prime}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
});

export default TextEncrypt;