import { number, parse, pipe, safeParse, string, transform }  from "valibot";
import { DrafProductSchema, Product, ProductSchema, ProductsSchema } from "../types";
import axios from "axios";

type ProductData = {
    [k: string]: FormDataEntryValue
}

export async function addProduct(data: ProductData){
    try {
        const result = safeParse(
            DrafProductSchema,
            {
                name: data.name,
                price: +data.price
            }
        );
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
            await axios.post(
                url,
                {
                    name: result.output.name,
                    price: result.output.price   
                }
            );
        } else {
            throw new Error('Datos no válidos');
        }
    } catch (error) {
        console.log(error);
    }
};

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;
        const { data } = await axios(url);
        const result = safeParse(ProductsSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            throw new Error('Error en al obtener productos');
        }
    } catch (error) {
        console.log(error);
    }
};

export async function getProductById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios(url);
        const result = safeParse(ProductSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            throw new Error('Error al obtener productos');
        }
    } catch (error) {
        console.log(error);
    }
};

export async function updateProduct(id: Product['id'], product: ProductData) {
    try {
        const NumberSchema = pipe(string(), transform(Number), number());
        const result = safeParse(ProductSchema, {
            id, 
            name: product.name,
            price: parse(NumberSchema, product.price),
            availability: product.availability.toString() === "true"
        });
        if (result.issues) {
            throw new Error('Error al actualizar producto');
        }

        const { data } = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/products/${id}`,
            result.output
        );
        const putResult = safeParse(ProductSchema, data.data);
        if (putResult.success) {
            return putResult.output;
        } else {
            throw new Error('Error al actualizar producto');
        }
    } catch (error) {
        console.log(error);
    }
};

export async function deleteProduct(id: Product['id']) {
    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
    } catch (error) {
        console.log(error);
    }
};

export async function updateProductAvailability(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.patch(url);
    } catch (error) {
        console.log(error);
    }
};