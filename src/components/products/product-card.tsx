import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function ProductCard({ product }: { product: Product }) {
    return (
        <Card className="flex h-full flex-col">
            <CardHeader className="p-4 pb-0">
                <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain"
                    />
                </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-2 p-4">
                <CardTitle className="line-clamp-1 text-base">
                    {product.title}
                </CardTitle>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">${product.price}</span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {product.rating}
                    </span>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full">
                    <Link href={`/products/${product.id}`}>View Details</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}