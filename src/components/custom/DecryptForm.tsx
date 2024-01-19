import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CryptoFormType } from "@/types/form";
import { decryptText } from "@/lib/crypto";
import { useTextCipher } from "@/hooks/useTextCipher";

type DecryptFormProps = {
    formType: CryptoFormType,
    inputLabel?: string,
    submitCallback?: () => void,
}

function DecryptForm({ formType, inputLabel, submitCallback }: DecryptFormProps) {
    const { textEncrypted } = useTextCipher();
    const decryptForm = z.object({
        input: z.string().min(1),
        c1_prime: z.coerce.number().min(-1).max(1),
        c2_prime: z.coerce.number().min(-1).max(1),
    })

    const form = useForm<z.infer<typeof decryptForm>>({
        resolver: zodResolver(decryptForm),
        defaultValues: {
            input: textEncrypted.cipherText,
            c1_prime: textEncrypted.c1Prime,
            c2_prime: textEncrypted.c2Prime,
        }
    })

    const onSubmit = async (data: z.infer<typeof decryptForm>) => {
        console.log("Submit from DecryptForm", data);

        switch (formType) {
            case CryptoFormType.TextDecrypt:
                await decryptText(data.input, data.c1_prime, data.c2_prime);
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

export default DecryptForm;