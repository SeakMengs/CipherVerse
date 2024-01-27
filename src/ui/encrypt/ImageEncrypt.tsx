import FileEncryptForm from "@/components/custom/FileEncryptForm";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
// import { parseStdOut } from "@/lib/parse";
import { RUNNING_IN_TAURI } from "@/lib/utils";
import { PyMessageIdentifier } from "@/types/event";
import { CryptoFormType } from "@/types/form";
import { listen } from "@tauri-apps/api/event";
import { memo, useEffect } from "react";
// import { convertFileSrc } from "@tauri-apps/api/tauri";

const ImageEncrypt = memo(() => {
    useEffect(() => {
        if (!RUNNING_IN_TAURI) {
            console.log('Not running in tauri, skipping event listener');
            return;
        }

        const unlisten = listen<string>('cipher_verse_message', (event) => {
            console.log('Received event:', event.payload);

            const splitPayload = event.payload.split('-splitter');
            if (splitPayload[0] === PyMessageIdentifier.ResultImageEncrypt) {
                // type ImageEncryptResult = {
                //     key_results: number[],
                //     original_values: number[],
                //     cipher_values: number[],
                // }

                // const result = parseStdOut<ImageEncryptResult>(splitPayload[1]);

                // setImageEncrypted({
                //     cipherText: result.cipher_values.map((v) => String.fromCharCode(v)).join(''),
                //     plainText: result.original_values.map((v) => String.fromCharCode(v)).join(''),
                //     c1Prime: result.key_results[14],
                //     c2Prime: result.key_results[15],
                // })
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
                                {/* {imageEncrypted.c1Prime} */}
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <p className="text-sm text-nowrap text-green-300">
                                C2:
                            </p>
                            <p className="text-sm">
                                {/* {imageEncrypted.c2Prime} */}
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <p className="text-sm text-nowrap text-green-300">
                                Plain Image:
                            </p>
                            {/* <img src={convertFileSrc("C:\Users\yato\Pictures\animegirl wallpaper.png")} alt="" /> */}
                        </div>
                        <div className="flex gap-1">
                            <p className="text-sm text-nowrap text-green-300">
                                Cipher Image:
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
});

export default ImageEncrypt;