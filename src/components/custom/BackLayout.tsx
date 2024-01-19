import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IconChevronLeft } from "@tabler/icons-react";
import { memo } from "react";
import { Link } from "react-router-dom";

const BackLayout = memo(({ children }: { children: React.ReactNode }) => {

    return (
        <ScrollArea className="h-full rounded-md border">
            <div className="w-full h-full m-auto px-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to={'..'}>
                                <Button variant="outline" className="my-6">
                                    <IconChevronLeft size={16} className="mr-2" />
                                    Back
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Go back</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {children}
            </div>
        </ScrollArea>
    )
});

export default BackLayout;