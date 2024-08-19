import { ActionFunctionArgs, Form, Link, redirect, useActionData } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../Services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    let error = '';
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios';
    }
    if (error.length) {
        return error;
    }
    await addProduct(data);
    return redirect('/');
}

function NewProduct() {

    const error = useActionData() as string;

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">
                    Registrar producto
                </h2>
                <Link
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                    to="/">
                    Volver a productos
                </Link>
            </div>
            { error && <ErrorMessage>{ error }</ErrorMessage> }
            <Form className="mt-10" method="POST">
                <ProductForm />
                <input className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    type="submit"
                    value="Registrar Producto"
                />
            </Form>
        </>
    );
}

export default NewProduct;
