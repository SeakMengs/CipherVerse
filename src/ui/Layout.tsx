import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IconChevronLeft } from "@tabler/icons-react";
import { memo } from "react";
import { Link } from "react-router-dom";

const Layout = memo(({ children }: { children: React.ReactNode}) => {

    return (
        <div className="w-[95%] h-screen m-auto">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link to={'..'}>
                                <Button variant="outline" className="my-6">
                                    <IconChevronLeft size={16} className="mr-2"/>
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
    )
});

export default Layout;