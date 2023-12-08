import React from "react";
import ProductsNavbar from "./ProductsNavbar";
import ProductsWrapper from "./ProductsWrapper";

const ProductsDrinksView = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', width: "100%"}}>
            <ProductsNavbar />
            <ProductsWrapper />
        </div>
    )
}

export default ProductsDrinksView;