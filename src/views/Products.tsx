import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";
import { getProducts, updateProductAvailability } from "../Services/ProductService";
import ProductDetail from "../components/ProductDetails";
import { Product } from "../types";

export async function loader() {
    return await getProducts();
};

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    await updateProductAvailability(+data.id);
    return {};
}

function Products() {
    const products = useLoaderData() as Product[];
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">
                    Productos
                </h2>
                <Link
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                    to="productos/nuevo">
                    Agregar producto
                </Link>
            </div>
            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => <ProductDetail key={ product.id } product={product} />)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Products;
