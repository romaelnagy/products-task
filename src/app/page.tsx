"use client";

import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { PRODUCTS_PER_PAGE } from "@/lib/api/products";
import { ProductCard } from "@/components/products/product-card";
import { ProductSkeleton } from "@/components/products/product-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProductsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // debounce: ما نبعتش طلب مع كل حرف
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isPending, isError, refetch, isPlaceholderData } =
    useProducts(search, page);

  const totalPages = data ? Math.ceil(data.total / PRODUCTS_PER_PAGE) : 0;

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8">
      <h1 className="text-3xl font-bold">Products</h1>

      <Input
        placeholder="Search products..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="max-w-md"
      />

      {isPending && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <div className="space-y-3 py-12 text-center">
          <p className="text-destructive">
            Something went wrong while loading products.
          </p>
          <Button onClick={() => refetch()}>Try again</Button>
        </div>
      )}

      {data && data.products.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          No products found for &quot;{search}&quot;.
        </p>
      )}

      {data && data.products.length > 0 && (
        <>
          <div
            className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 ${
              isPlaceholderData ? "opacity-60" : ""
            }`}
          >
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages || isPlaceholderData}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </main>
  );
}