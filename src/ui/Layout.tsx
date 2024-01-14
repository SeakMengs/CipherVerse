import { memo, useState } from "react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

const variantSchema = z.object({
    // auto convert string to number
    c1: z.coerce.number(),
    c2: z.coerce.number(),
    key: z.string().length(16, {
        message: "Key must be exactly 16 characters long"
    }),
})

type SetVariantProps = {
    setOpenVariant: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetVariant = ({ setOpenVariant }: SetVariantProps) => {
    const form = useForm<z.infer<typeof variantSchema>>({
        resolver: zodResolver(variantSchema),
        defaultValues: {
            c1: parseInt(localStorage.getItem("c1") || "0"),
            c2: parseInt(localStorage.getItem("c2") || "0"),
            key: localStorage.getItem("key") || "",
        }
    })
    const { toast } = useToast();

    const onSubmit = (data: z.infer<typeof variantSchema>) => {
        localStorage.setItem("c1", data.c1.toString());
        localStorage.setItem("c2", data.c2.toString());
        localStorage.setItem("key", data.key);

        setOpenVariant(false);
        toast({
            title: "Set Variant",
            description: "Variant has been successfully set!",
        })
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Set Variant</DialogTitle>
                <DialogDescription>
                    Set variant and key for encryption. Click save when you're done.
                </DialogDescription>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" id="setVariant">
                        <FormField
                            control={form.control}
                            name="c1"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>C1</FormLabel>
                                    <FormControl>
                                        <Input placeholder="C1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="c2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>C2</FormLabel>
                                    <FormControl>
                                        <Input placeholder="C2" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                    </form>
                </Form>
                <DialogFooter>
                    <Button type="submit" form="setVariant">Save changes</Button>
                </DialogFooter>
            </DialogHeader>
        </>
    )

}

const Layout = memo(({ children }: { children: React.ReactNode }) => {
    const [openSetVariant, setOpenSetVariant] = useState<boolean>(false);

    return (
        <>
            <div className="overflow-hidden h-screen">
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>Setting</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem onClick={() => setOpenSetVariant((prev) => !prev)}>
                                Set Variant
                            </MenubarItem>
                            <MenubarItem>
                                About
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
                <Dialog open={openSetVariant} onOpenChange={setOpenSetVariant}>
                    <DialogContent>
                        <SetVariant setOpenVariant={setOpenSetVariant} />
                    </DialogContent>
                </Dialog>
                <ScrollArea className="w-full h-full rounded-md border flex" >
                    {children}
                </ScrollArea>
            </div>
        </>
    )
});

export default Layout;