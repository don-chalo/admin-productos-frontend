import { array, boolean, number, object, string, InferOutput } from "valibot";

export const DrafProductSchema = object({
    name: string(),
    price: number()
});

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
});

export type Product = InferOutput<typeof ProductSchema>;

export const ProductsSchema = array(ProductSchema);

export type Products = InferOutput<typeof ProductsSchema>;
