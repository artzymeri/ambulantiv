import React, { useState } from "react";
import ProductsNavbar from "./ProductsNavbar";
import ProductsWrapper from "./ProductsWrapper";

const ProductsView = (props) => {
  const {
    allProducts,
    drinksProducts,
    fruitsandvegetablesProducts,
    foodProducts,
    housekeepProducts,
    hygeneProducts,
  } = props;

  const [searchQuery, setSearchQuery] = useState("");

  const changeSearchQuery = (string) => {
    setSearchQuery(string);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <ProductsNavbar changeSearchQuery={changeSearchQuery} />
      <ProductsWrapper
        searchQuery={searchQuery}
        allProducts={allProducts}
        drinksProducts={drinksProducts}
        fruitsandvegetablesProducts={fruitsandvegetablesProducts}
        foodProducts={foodProducts}
        housekeepProducts={housekeepProducts}
        hygeneProducts={hygeneProducts}
      />
    </div>
  );
};

export default ProductsView;
