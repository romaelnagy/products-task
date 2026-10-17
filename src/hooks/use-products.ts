import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchProduct, fetchProducts } from "@/lib/api/products";

export function useProducts(search: string, page: number) {
    return useQuery({
        queryKey: ["products", { search, page }],
        queryFn: () => fetchProducts({ search, page }),
        placeholderData: keepPreviousData,
    });
}

export function useProduct(id: number) {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProduct(id),
    });
}