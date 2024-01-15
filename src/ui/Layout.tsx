import { memo, useState } from "react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SetVariantForm from "@/components/custom/SetVariantForm";

type SetVariantProps = {
    setOpenVariant: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetVariant = ({ setOpenVariant }: SetVariantProps) => {

    return (
        <>
            <DialogHeader>
                <DialogTitle>Set Variant</DialogTitle>
                <DialogDescription>
                    Set variant and key for encryption. Click save when you're done.
                </DialogDescription>
                <SetVariantForm submitCallback={() => setOpenVariant(false)}/>
            </DialogHeader>
        </>
    )
}

const Layout = memo(({ children }: { children: React.ReactNode }) => {
    const [openSetVariant, setOpenSetVariant] = useState<boolean>(false);

    return (
        <>
            <div className="h-screen overflow-hidden">
                <div className="">
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
                            <SetVariant setOpenVariant={setOpenSetVariant} key={1} />
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="w-full h-[calc(100%-36px)] ">
                    {children}
                </div>
            </div>
        </>
    )
});

export default Layout;