import React from "react";
import "@/styling/productsnavbar.css";
import SearchIcon from '@mui/icons-material/Search';

const ProductsNavbar = () => {
    return (
        <div className="products-navbar-parent-wide">
            <div className="products-navbar-search-container">
                <SearchIcon sx={{color: 'gray'}} />
                <input type="text" placeholder="Kërko produktet"/>
            </div>
        </div>
    )
}

export default ProductsNavbar;