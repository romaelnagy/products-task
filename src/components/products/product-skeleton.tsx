import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
    return (
        <Card className="h-full">
            <CardHeader className="p-4 pb-0">
                <Skeleton className="aspect-square w-full" />
            </CardHeader>
            <CardContent className="space-y-2 p-4">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Skeleton className="h-9 w-full" />
            </CardFooter>
        </Card>
    );
}