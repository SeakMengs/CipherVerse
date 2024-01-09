import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

function NoMatch() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-[420px]">
                <CardHeader className="text-center">
                    <CardTitle className="lg:text-7xl text-4xl">404</CardTitle>
                    <CardDescription>
                        The page you’re looking for doesn’t exist.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center">
                    <Button asChild>
                        <Link to="/">Go Back</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default NoMatch;