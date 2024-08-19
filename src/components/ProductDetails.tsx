import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../Services/ProductService";

type ProductDetailsProps = {
    product: Product
};

export async function action({ params }: ActionFunctionArgs) {
    if (params.id) {
        await deleteProduct(+params.id);
        return redirect('/');
    }
};

export default function ProductDetail({ product }: ProductDetailsProps) {
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/productos/${product.id}/edicion`);
    };
    const fetcher = useFetcher();

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                { product.name }
            </td>
            <td className="p-3 text-lg text-gray-800">
                { formatCurrency(product.price) }
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button className={`rounded-lg p-2 text-xs uppercase font-bold w-full border-black-100 hover:cursor-pointer ${product.availability ? 'text-black' : 'text-red-600' }`}
                        name="id"
                        type="submit"
                        value={product.id}>
                        { product.availability ? 'Disponible' : 'No Disponible' }
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                        onClick={handleEdit}>
                        Editar
                    </button>
                    {/* <Link className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                        to={`/productos/${product.id}/edicion`}>
                        Editar
                    </Link> */}
                    <Form action={`/productos/${product.id}/eliminar`}
                        className="w-full"
                        method="POST"
                        onSubmit={(e) => {
                            if (!confirm('¿Deseas eliminar este producto?')) {
                                e.preventDefault();
                            }
                        }}>
                        <input className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                            type="submit"
                            value="Eliminar"
                        />
                    </Form>
                </div>
            </td>
        </tr> 
    );
}
