import { Product, ProductsResponse } from "@/types/product";

const BASE_URL = "https://dummyjson.com/products";

export const PRODUCTS_PER_PAGE = 12;

interface FetchProductsParams {
    search?: string;
    page?: number;
}

export async function fetchProducts({
    search = "",
    page = 1,
}: FetchProductsParams): Promise<ProductsResponse> {
    const skip = (page - 1) * PRODUCTS_PER_PAGE;

    const url = search
        ? `${BASE_URL}/search?q=${encodeURIComponent(search)}&limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
        : `${BASE_URL}?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}

export async function fetchProduct(id: number): Promise<Product> {
    const res = await fetch(`${BASE_URL}/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }

    return res.json();
}