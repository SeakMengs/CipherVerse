import FileEncryptForm from "@/components/custom/FileEncryptForm";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { parseStdOut } from "@/lib/parse";
import { RUNNING_IN_TAURI, isSideCarReady } from "@/lib/utils";
import { CryptoFormType } from "@/types/form";
import { listen } from "@tauri-apps/api/event";
import { memo, useEffect } from "react";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { useFileCipher } from "@/hooks/useFileCipher";
import { useToast } from "@/components/ui/use-toast";

const ImageEncrypt = memo(() => {
    const { fileEncrypted, setFileEncrypted } = useFileCipher();
    const { toast } = useToast();

    useEffect(() => {
        if (!RUNNING_IN_TAURI) {
            console.log('Not running in tauri, skipping event listener');
            return;
        }

        const unlisten = listen<string>('cipher_verse_message', (event) => {
            console.log('Received event:', event.payload);

            const { sideCarReady, stdout } = isSideCarReady(event.payload, CryptoFormType.ImageEncrypt);
            if (sideCarReady) {
                type ImageEncryptResult = {
                    keyResults: number[],
                    plainImageFilePath: string,
                    cipherImageOutputFilePath: string,
                    success: boolean,
                }

                const result = parseStdOut<ImageEncryptResult>(stdout);

                if (!result.success) {
                    toast({
                        title: 'Error',
                        description: 'An error occurred while encrypting the image',
                    });
                    return;
                }

                setFileEncrypted({
                    plainInputFilePath: result.plainImageFilePath,
                    cipherOutputFilePath: result.cipherImageOutputFilePath,
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
            <div className="w-full h-[full] m-auto flex flex-col px-5">
                <div className="p-6">
                    <FileEncryptForm formType={CryptoFormType.ImageEncrypt} />
                    <Separator className="my-3" />
                    <div className="flex justify-center m-2">
                        <Label>Output</Label>
                    </div>
                    <div className="text-wrap">
                        <div className="flex gap-1">
                            <p className="text-sm text-nowrap text-green-300">
                                C1:
                            </p>
                            <p className="text-sm">
                                {fileEncrypted.c1Prime}
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <p className="text-sm text-nowrap text-green-300">
                                C2:
                            </p>
                            <p className="text-sm">
                                {fileEncrypted.c2Prime}
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <p className="text-sm text-nowrap text-green-300">
                                {`Plain Image: ${fileEncrypted.plainInputFilePath}`}
                            </p>
                            <div className="">
                                {
                                    (RUNNING_IN_TAURI && fileEncrypted.plainInputFilePath) &&
                                    <img className="p-8 max-h-96 max-w-96" src={convertFileSrc(fileEncrypted.plainInputFilePath)} alt="Image" />
                                }
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <p className="text-sm text-nowrap text-green-300">
                                {`Cipher Image: ${fileEncrypted.cipherOutputFilePath}`}
                            </p>
                            <div className="">
                                {
                                    (RUNNING_IN_TAURI && fileEncrypted.cipherOutputFilePath) &&
                                    <img className="p-8 max-h-96 max-w-96" src={convertFileSrc(fileEncrypted.cipherOutputFilePath)} alt="Image" />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
});

export default ImageEncrypt;