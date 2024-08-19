import { createBrowserRouter } from "react-router-dom";

import Layout from "./layouts/Layout";
import Products, { action as updateAvailabilityAction, loader as productsLoader } from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import EditProduct, { action as editProductAction, loader as editProductLoader } from "./components/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
    {
        children: [
            {
                action: updateAvailabilityAction,
                element: <Products />,
                index: true,
                loader: productsLoader
            },
            {
                action: newProductAction,
                element: <NewProduct />,
                path: '/productos/nuevo'
            },
            {
                action: editProductAction,
                element: <EditProduct />,
                loader: editProductLoader,
                path: '/productos/:id/edicion'
            },
            {
                path: '/productos/:id/eliminar',
                action: deleteProductAction
            }
        ],
        element: <Layout />,
        path: '/'
    }
]);
