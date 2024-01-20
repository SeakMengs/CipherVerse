import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CryptoFormType } from "@/types/form";
import { encryptText } from "@/lib/crypto";
import { useTextCipher } from "@/hooks/useTextCipher";

type TextEncryptFormProps = {
    formType: CryptoFormType,
    inputLabel?: string,
    submitCallback?: () => void,
}

function TextEncryptForm({ formType, inputLabel, submitCallback }: TextEncryptFormProps) {
    const { textEncrypted } = useTextCipher();

    const textEncryptForm = z.object({
        input: z.string().min(1),
    })

    const form = useForm<z.infer<typeof textEncryptForm>>({
        resolver: zodResolver(textEncryptForm),
        defaultValues: {
            input: textEncrypted.plainText ?? "",
        }
    })

    const onSubmit = async (data: z.infer<typeof textEncryptForm>) => {
        console.log("Submit from TextEncryptForm", data);

        switch (formType) {
            case CryptoFormType.TextEncrypt:
                await encryptText(data.input);
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
                    name="input"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{inputLabel ?? "Input"}</FormLabel>
                            <FormControl>
                                <Input placeholder={inputLabel ?? "Input"} {...field} />
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

export default TextEncryptForm;