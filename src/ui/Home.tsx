import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ImageIcon, TextIcon, VideoIcon } from "@radix-ui/react-icons"
import React from "react"

function Section({
    Icon
}: {
    Icon: React.ElementType
}) {
    return (
        <>
            <AspectRatio ratio={8/2} className="m-12">
                <Card className="grid place-items-center text-center h-full">
                    <CardContent>
                        <Icon className="w-48 h-48" />
                        <Label>Text</Label>
                    </CardContent>
                </Card>
            </AspectRatio>
        </>
    )
}

function Home() {

    return (
        <>
            <div className="w-full h-screen grid grid-cols-2">
                <Section Icon={TextIcon}/>
                <Section Icon={ImageIcon}/>
                <Section Icon={VideoIcon}/>
                <Section Icon={TextIcon}/>
            </div>
        </>
    )
}

export default Home