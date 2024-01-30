import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CryptoFormType } from "@/types/form";
import { IconFile } from "@tabler/icons-react";
import { open } from "@tauri-apps/api/dialog";
import { RUNNING_IN_TAURI } from "@/lib/utils";
import { useFileCipher } from "@/hooks/useFileCipher";
import { decryptAudio, decryptImage, decryptVideo } from "@/lib/crypto";

type FileDecryptFormProps = {
    formType: CryptoFormType,
    inputLabel?: string,
    outputLabel?: string,
    submitCallback?: () => void,
}

function FileDecryptForm({ formType, inputLabel, outputLabel, submitCallback }: FileDecryptFormProps) {
    const { fileEncrypted } = useFileCipher();

    const fileDecryptForm = z.object({
        cipherInputFilePath: z.string().min(1),
        plainOutputFolderPath: z.string().min(1),
        plainOutputFileName: z.string().min(1),
        c1_prime: z.coerce.number().min(-1).max(1),
        c2_prime: z.coerce.number().min(-1).max(1),
    })

    const form = useForm<z.infer<typeof fileDecryptForm>>({
        resolver: zodResolver(fileDecryptForm),
        defaultValues: {
            cipherInputFilePath: fileEncrypted.cipherOutputFilePath ?? "",
            plainOutputFolderPath: "",
            plainOutputFileName: "",
            c1_prime: fileEncrypted.c1Prime ?? 0,
            c2_prime: fileEncrypted.c2Prime ?? 0,
        }
    })

    const onSubmit = async (data: z.infer<typeof fileDecryptForm>) => {
        console.log("Submit from FileDecryptForm", data);

        switch (formType) {
            case CryptoFormType.ImageDecrypt:
                // TODO: implement image decryption
                await decryptImage();
                break;
            case CryptoFormType.VideoDecrypt:
                // TODO: implement video decryption
                await decryptVideo();
                break;
            case CryptoFormType.AudioDecrypt:
                // TODO: implement audio decryption
                await decryptAudio();
                break;
            default:
                break;
        }

        if (typeof submitCallback !== "undefined") {
            submitCallback();
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                    control={form.control}
                    name="cipherInputFilePath"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{inputLabel ?? "Cipher Input File Path"}</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-4">
                                    <Input disabled placeholder={inputLabel ?? "Cipher Input File Path"} {...field} />
                                    <IconFile className="cursor-pointer" onClick={async () => {
                                        if (!RUNNING_IN_TAURI) {
                                            console.log("Not Running on tauri skip opening file")
                                            return
                                        }

                                        form.setValue("cipherInputFilePath", await open() as string)
                                    }} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="plainOutputFolderPath"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{outputLabel ?? "Plain Output Folder Path"}</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-4">
                                    <Input disabled placeholder={outputLabel ?? "Plain Output Folder Path"} {...field} />
                                    <IconFile className="cursor-pointer" onClick={async () => {
                                        if (!RUNNING_IN_TAURI) {
                                            console.log("Not Running on tauri skip opening directory")
                                            return
                                        }

                                        form.setValue("plainOutputFolderPath", await open({
                                            directory: true,
                                        }) as string)
                                    }} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="plainOutputFileName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Plain Output File Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Plain Output File Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="c1_prime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>C1'</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="C1'" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="c2_prime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>C2'</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="C2'" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex-grow">
                    <div className="flex justify-end">
                        <Button type="submit" className="float-right">Decrypt</Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default FileDecryptForm;