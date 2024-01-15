import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import React, { memo, useEffect } from "react"
import { Link } from "react-router-dom"
import { IconFileMusic, IconPhoto, IconTextSize, IconVideo } from '@tabler/icons-react';
// import { invoke } from '@tauri-apps/api/tauri'
import { listen } from '@tauri-apps/api/event';
import { RUNNING_IN_TAURI } from "@/lib/utils";
import SetVariantForm from "@/components/custom/SetVariantForm";
import { Card } from "@/components/ui/card";

type SectionProps = {
    Icon: React.ElementType,
    to: string,
    text: string,
}

function Section({
    Icon,
    to,
    text,
}: SectionProps) {

    return (
        <>
            <Link to={to}>
                <Button variant="outline" className="h-full w-full">
                    <div className="grid place-items-center text-center gap-2">
                        <Icon className="w-16 h-16" />
                        <Label className="">{text}</Label>
                    </div>
                </Button>
            </Link>
        </>
    )
}

const Home = memo(() => {
    const sections = [
        {
            Icon: IconTextSize,
            to: "/text",
            text: "Encrypt/Decrypt Text",
        },
        {
            Icon: IconPhoto,
            to: "/image",
            text: "Encrypt/Decrypt Image",
        },
        {
            Icon: IconVideo,
            to: "/video",
            text: "Encrypt/Decrypt Video",
        },
        {
            Icon: IconFileMusic,
            to: "/audio",
            text: "Encrypt/Decrypt Audio",
        }
    ]

    // async function testCmd() {
    //     await invoke("cipher_verse", {
    //         args: [
    //             "image",
    //             "-t",
    //             "encrypt",
    //             "-i",
    //             "Hello World input",
    //             "-k",
    //             "Hello World key",
    //         ]
    //     });
    // }

    useEffect(() => {
        if (!RUNNING_IN_TAURI) {
            // console.log('Not running in tauri, skipping event listener');
            return;
        }

        const unlisten = listen<string>('cipher_verse_message', (event) => {
            console.log('Received event:', event.payload);
        });

        return () => {
            unlisten.then(f => f());
        };
    }, [])

    return (
        <>
        <div className="overflow-y-auto h-full">
            <div className="w-full h-full m-auto flex flex-col px-5">
                <div className="py-5">
                    <Card>
                        <div className="p-6">
                            <SetVariantForm key={2}/>
                        </div>
                    </Card>
                </div>
                <div className="h-full w-full grid grid-cols-2 gap-5 pb-5">
                    {
                        sections.map((section, index) => (
                            <Section key={index} {...section} />
                        ))
                    }
                </div>
            </div>
        </div>
            {/* <Button onClick={async () => testCmd()} variant="outline" className="absolute bottom-0 right-0 m-4">
                Test Side Car from python
            </Button> */}
        </>
    )
});

export default Home;
