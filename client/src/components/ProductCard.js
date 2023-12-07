import React from "react";
import "@/styling/global.css"
import "@/styling/productcard.css"
import { AddShoppingCart } from "@mui/icons-material";

const ProductCard = (props) => {

    const {photo, price, name, weight, distributor} = props.product;
    

    return (
        <div className="product-card-parent">
                <img src={photo} />
                <div className="product-card-text-container">
                  <div className="product-card-text-up">
                    <h3 style={{width: '180px'}}>{name}</h3>
                    <p style={{fontSize: '13px'}}>{weight}, <b>{distributor}</b></p>
                  </div>
                  <div className="product-card-text-down">
                    <h2>{price}€</h2>
                    <button>
                        <AddShoppingCart sx={{height: '25px', width: '25px', color: 'white', filter: 'dropshadow(0px, 0px, 5px, black'}} />
                    </button>
                  </div>
                </div>
              </div>
    )
}

export default ProductCard;