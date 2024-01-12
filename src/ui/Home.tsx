import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import React, { memo } from "react"
import { Link } from "react-router-dom"
import { IconFileMusic, IconPhoto, IconTextSize, IconVideo } from '@tabler/icons-react';

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
                <Button variant="outline" className="h-full w-full min-w-96 min-h-96">
                    <div className="grid place-items-center text-center gap-2">
                        <Icon className="w-16 h-16" />
                        <Label>{text}</Label>
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

    return (
        <>
            <div className="w-full h-screen flex flex-col justify-center items-center gap-12">
                <div className="grid grid-cols-2 gap-12">
                    {
                        sections.map((section, index) => (
                            <Section key={index} {...section} />
                        ))
                    }
                </div>
            </div>
        </>
    )
});

export default Home;
