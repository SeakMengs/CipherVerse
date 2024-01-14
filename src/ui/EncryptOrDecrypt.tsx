import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { memo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
    label?: string,
    Icon: React.ElementType,
    EncryptContent: JSX.Element,
    DecryptContent: JSX.Element,
}

const EncryptOrDecrypt = memo(({ label, Icon, EncryptContent, DecryptContent }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("type") || "encrypt";

    useEffect(() => {
        if (tab == searchParams.get("type")) return;
        setSearchParams({ type: tab });
    }, [tab, setSearchParams])

    return (
        <>
            <div className="flex items-center flex-col">
                <div className="my-6 flex items-center flex-col">  
                    <Icon size={64} />
                    <Label className="mt-2">{label}</Label>
                </div>
                <Tabs defaultValue={tab} onValueChange={(value) => {
                    setSearchParams({ type: value });
                }} className="w-[100%]" value={tab}>
                    <div className="grid place-items-center">
                        <TabsList className="grid w-[40%] grid-cols-2">
                            <TabsTrigger value="encrypt">Encrypt</TabsTrigger>
                            <TabsTrigger value="decrypt">Decrypt</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="encrypt">
                        {EncryptContent}
                    </TabsContent>
                    <TabsContent value="decrypt">
                        {DecryptContent}
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
});

export default EncryptOrDecrypt;