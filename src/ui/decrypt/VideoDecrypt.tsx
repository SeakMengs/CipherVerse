import FileDecryptForm from "@/components/custom/FileDecryptForm";
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

const VideoDecrypt = memo(() => {
    const { fileDecrypted, setFileDecrypted } = useFileCipher();
    const { toast } = useToast();

    useEffect(() => {
        if (!RUNNING_IN_TAURI) {
            console.log('Not running in tauri, skipping event listener');
            return;
        }

        const unlisten = listen<string>('cipher_verse_message', (event) => {
            console.log('Received event:', event.payload);

            const { sideCarReady, stdout } = isSideCarReady(event.payload, CryptoFormType.VideoDecrypt);
            if (sideCarReady) {
                type VideoDecryptResult = {
                    cipherVideoFilePath: string,
                    plainVideoOutputPath: string,
                    success: boolean,
                }

                const result = parseStdOut<VideoDecryptResult>(stdout);

                if (!result.success) {
                    toast({
                        title: 'Error',
                        description: 'An error occurred while decrypting the video',
                    });
                    return;
                }

                setFileDecrypted({
                    cipherInputFilePath: result.cipherVideoFilePath,
                    plainOutputFilePath: result.plainVideoOutputPath,
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
                    <FileDecryptForm formType={CryptoFormType.VideoDecrypt} />
                    <Separator className="my-3" />
                    <div className="flex justify-center m-2">
                        <Label>Output</Label>
                    </div>
                    <div className="text-wrap">
                        <div className="flex gap-1">
                            <p className="text-sm text-nowrap text-green-300">
                                {`Cipher Video: ${fileDecrypted.cipherInputFilePath}`}
                            </p>
                            <div className="">
                                {
                                    (RUNNING_IN_TAURI && fileDecrypted.cipherInputFilePath) &&
                                    <video className="p-8 max-h-96 max-w-96" controls>
                                        <source src={convertFileSrc(fileDecrypted.cipherInputFilePath)} />
                                    </video>
                                }
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <p className="text-sm text-nowrap text-green-300">
                                {`Plain Video: ${fileDecrypted.plainOutputFilePath}`}
                            </p>
                            <div className="">
                                {
                                    (RUNNING_IN_TAURI && fileDecrypted.plainOutputFilePath) &&
                                    <video className="p-8 max-h-96 max-w-96" controls>
                                        <source src={convertFileSrc(fileDecrypted.plainOutputFilePath)} />
                                    </video>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
});

export default VideoDecrypt;