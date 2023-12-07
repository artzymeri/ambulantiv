import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "@/styling/productswrapper.css"

const ProductsWrapper = () => {

    const [productsData, setProductsData] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8080/getlistedproducts').then((res)=>{
            setProductsData(res.data);
        })
    },[])

    return (
        <div className="products-wrapper-parent">
            {productsData.slice().reverse().map((product)=>{
                return(
                    <ProductCard product={product} />
                )
            })}
        </div>
    )
}

export default ProductsWrapper;