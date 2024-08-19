import { Product } from "../types";

type ProductFormProps = {
    product?: Product
}

function ProductForm({ product }: ProductFormProps) {
    return (
        <>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">
                    Nombre Producto:
                </label>
                <input className="mt-2 block w-full p-3 bg-gray-50"
                    defaultValue={product?.name}
                    id="name"
                    name="name"
                    placeholder="Nombre del Producto"
                    type="text"
                />
            </div>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="price">
                    Precio:
                </label>
                <input className="mt-2 block w-full p-3 bg-gray-50"
                    defaultValue={product?.price}
                    id="price"
                    name="price"
                    placeholder="Precio Producto. ej. 200, 300"
                    type="number"
                />
            </div>
        </>
    );
}

export default ProductForm;