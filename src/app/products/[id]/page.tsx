"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { useProduct } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function ProductDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const { data: product, isPending, isError, refetch } = useProduct(Number(id));

    return (
        <main className="mx-auto max-w-4xl space-y-6 px-4 py-8">
            <Button asChild variant="ghost">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to products
                </Link>
            </Button>

            {isPending && (
                <div className="grid gap-6 md:grid-cols-2">
                    <Skeleton className="aspect-square w-full" />
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                </div>
            )}

            {isError && (
                <div className="space-y-3 py-12 text-center">
                    <p className="text-destructive">Failed to load this product.</p>
                    <Button onClick={() => refetch()}>Try again</Button>
                </div>
            )}

            {product && (
                <Card>
                    <CardContent className="grid gap-6 p-6 md:grid-cols-2">
                        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted">
                            <Image
                                src={product.thumbnail}
                                alt={product.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-contain"
                                priority
                            />
                        </div>

                        <div className="space-y-4">
                            <CardHeader className="p-0">
                                <CardTitle className="text-2xl">{product.title}</CardTitle>
                                <CardDescription className="capitalize">
                                    {product.brand ? `${product.brand} · ` : ""}
                                    {product.category}
                                </CardDescription>
                            </CardHeader>

                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-bold">${product.price}</span>
                                <span className="flex items-center gap-1 text-muted-foreground">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    {product.rating}
                                </span>
                            </div>

                            <p className="text-muted-foreground">{product.description}</p>

                            <p className="text-sm">In stock: {product.stock}</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </main>
    );
}