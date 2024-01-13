import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import React, { memo, useEffect } from "react"
import { Link } from "react-router-dom"
import { IconFileMusic, IconPhoto, IconTextSize, IconVideo } from '@tabler/icons-react';
import { invoke } from '@tauri-apps/api/tauri'
import { Command } from '@tauri-apps/api/shell';
import { listen } from '@tauri-apps/api/event';

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

    async function testCmd() {
        // const command = Command.sidecar("bin/python/cipher_verse", [
        //     "text",
        //     "-t",
        //     "encrypt",
        //     "-i",
        //     "Hello World input",
        //     "-k",
        //     "Hello World key",
        // ])
        // const output = await command.execute();
        // console.log(JSON.stringify(output.stdout, null, 2));
        await invoke("cipher_verse", {
            args: [
                "text",
                "-t",
                "encrypt",
                "-i",
                "Hello World input",
                "-k",
                "Hello World key",
            ]
        });

    }

    useEffect(() => {
        const unlisten = listen<string>('cipher_verse_message', (event) => {
            console.log('Received event:', event.payload);
        });

        return () => {
            unlisten.then(f => f());
        };
    }, [])

    return (
        <>
            <div className="w-full h-screen grid place-items-center">
                <div className="h-[90%] w-[90%] grid grid-cols-2 gap-12">
                    {
                        sections.map((section, index) => (
                            <Section key={index} {...section} />
                        ))
                    }
                </div>
            </div>
            <Button onClick={async () => testCmd()} variant="outline" className="absolute bottom-0 right-0 m-4">
                Test Side Car from python
            </Button>
        </>
    )
});

export default Home;
