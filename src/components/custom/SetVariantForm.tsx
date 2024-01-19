import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { memo } from "react";
import { useVariantStore, variantSchema } from "@/hooks/useVariantStore";

type SetVariantFormProps = {
    submitCallback?: () => void;
}

const SetVariantForm = memo(({ submitCallback }: SetVariantFormProps) => {
    const { getVariantFromStorage } = useVariantStore();
    const form = useForm<z.infer<typeof variantSchema>>({
        resolver: zodResolver(variantSchema),
        defaultValues: getVariantFromStorage(),
    })
    const { toast } = useToast();

    const onSubmit = (data: z.infer<typeof variantSchema>) => {
        localStorage.setItem("c1", data.c1.toString());
        localStorage.setItem("c2", data.c2.toString());
        localStorage.setItem("y1", data.y1.toString());
        localStorage.setItem("y2", data.y2.toString());
        localStorage.setItem("y1_prime", data.y1_prime.toString());
        localStorage.setItem("y2_prime", data.y2_prime.toString());
        localStorage.setItem("key", data.key);

        toast({
            title: "Set Variant",
            description: "Variant has been successfully set!",
        })

        if (typeof submitCallback !== "undefined") {
            submitCallback();
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <div className="flex gap-7">
                        <FormField
                            control={form.control}
                            name="c1"
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormLabel>C1</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="C1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="c2"
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormLabel>C2</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="C2" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-7">
                        <FormField
                            control={form.control}
                            name="y1"
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormLabel>Y1</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Y1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="y2"
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormLabel>Y2</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Y2" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-7">
                        <FormField
                            control={form.control}
                            name="y1_prime"
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormLabel>Y1'</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Y1'" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="y2_prime"
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormLabel>Y2'</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Y2'" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="key"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Key</FormLabel>
                                <FormControl>
                                    <Input placeholder="Key" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex-grow">
                        <div className="flex justify-end">
                            <Button type="submit" className="float-right">Save changes</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </>
    )
})

export default SetVariantForm