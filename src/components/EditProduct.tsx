import { ActionFunctionArgs, Form, Link, LoaderFunctionArgs, redirect, useActionData, useLoaderData } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../Services/ProductService";
import { Product } from "../types";
import ProductForm from "./ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id) {
        const product = await getProductById(+params.id);
        if (!product) {
            // return redirect('/');
            throw new Response('', { status: 404, statusText: "Producto no encontrado" });
        }
        return product;
    }
    return {};
}

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    let error = '';
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios';
    }
    if (error.length) {
        return error;
    }
    if (params.id !== undefined) {        
        await updateProduct(+params.id, data);
        return redirect('/');
    }
}

const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
 ]

export default function EditProduct() {
    const error = useActionData() as string;
    const product = useLoaderData() as Product;

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">
                    Editar producto
                </h2>
                <Link
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                    to="/">
                    Volver a productos
                </Link>
            </div>
            { error && <ErrorMessage>{ error }</ErrorMessage> }
            <Form className="mt-10" method="POST">
                
                <ProductForm product={product} />

                <div className="mb-4">
                    <label className="text-gray-800"
                        htmlFor="availability">
                        Disponibilidad:
                    </label>
                    <select className="mt-2 block w-full p-3 bg-gray-50"
                        id="availability"
                        name="availability"
                        defaultValue={product?.availability.toString()}>
                            {
                                availabilityOptions.map(option => (<option key={option.name} value={option.value.toString()}>{option.name}</option>))
                            }
                    </select>
                </div>
                <input className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    type="submit"
                    value="Guardar cambios"
                />
            </Form>
        </>
    );
}
