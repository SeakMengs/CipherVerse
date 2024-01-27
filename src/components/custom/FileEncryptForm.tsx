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

type FileEncryptFormProps = {
    formType: CryptoFormType,
    inputLabel?: string,
    outputLabel?: string,
    submitCallback?: () => void,
}

function FileEncryptForm({ formType, inputLabel, outputLabel, submitCallback }: FileEncryptFormProps) {
    const fileEncryptForm = z.object({
        plainInputFilePath: z.string().min(1),
        cipherOutputFolderPath: z.string().min(1),
        cipherOutputFileName: z.string().min(1),
    })

    const form = useForm<z.infer<typeof fileEncryptForm>>({
        resolver: zodResolver(fileEncryptForm),
        defaultValues: {
            plainInputFilePath: "",
            cipherOutputFolderPath: "",
            cipherOutputFileName: "",
        }
    })

    const onSubmit = async (data: z.infer<typeof fileEncryptForm>) => {
        console.log("Submit from FileEncryptForm", data);

        switch (formType) {
            case CryptoFormType.ImageEncrypt:
                // await encryptText(data.input);
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
                    name="plainInputFilePath"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{inputLabel ?? "Plain Input File Path"}</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-4">
                                    <Input disabled placeholder={inputLabel ?? "Plain Input File Path"} {...field} />
                                    <IconFile className="cursor-pointer" onClick={async () => {
                                        if (!RUNNING_IN_TAURI) {
                                            console.log("Not Running on tauri skip opening file")
                                            return
                                        }

                                        form.setValue("plainInputFilePath", await open() as string)
                                    }} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cipherOutputFolderPath"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{outputLabel ?? "Cipher Output Folder Path"}</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-4">
                                    <Input disabled placeholder={outputLabel ?? "Cipher Output Folder Path"} {...field} />
                                    <IconFile className="cursor-pointer" onClick={async () => {
                                        if (!RUNNING_IN_TAURI) {
                                            console.log("Not Running on tauri skip opening directory")
                                            return
                                        }

                                        form.setValue("cipherOutputFolderPath", await open({
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
                    name="cipherOutputFileName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cipher Output File Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Cipher Output File Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex-grow">
                    <div className="flex justify-end">
                        <Button type="submit" className="float-right">Encrypt</Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default FileEncryptForm;