import React, { useEffect, useState } from "react";
import "@/styling/productsnavbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import {
  Blender,
  Category,
  CleanHands,
  Fastfood,
  GrassRounded,
  House,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const ProductsNavbar = (props) => {
  const { changeSearchQuery } = props;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const productOptions = [
    {
      id: 1,
      pathOnClick: "/pranues/products",
      icon: <Category />,
      name: "Lista e produkteve",
    },
    {
      id: 2,
      pathOnClick: "/pranues/products/drinks",
      icon: <Blender />,
      name: "Pijet",
    },
    {
      id: 3,
      pathOnClick: "/pranues/products/fruitsandvegetables",
      icon: <GrassRounded />,
      name: "Frutat dhe Perimet",
    },
    {
      id: 4,
      pathOnClick: "/pranues/products/food",
      icon: <Fastfood />,
      name: "Ushqimore",
    },
    {
      id: 5,
      pathOnClick: "/pranues/products/housekeep",
      icon: <House />,
      name: "Shtëpiake",
    },
    {
      id: 6,
      pathOnClick: "/pranues/products/hygene",
      icon: <CleanHands />,
      name: "Higjenë",
    },
  ];

  const isActiveOption = (path) => {
    return router.pathname === path ? "active-navbar-option" : null;
  };

  const productNameDynamic = (option) => {
    return router.pathname === option.pathOnClick ? (
      <h4>{option.name}</h4>
    ) : null;
  };

  const router = useRouter();

  return (
    isClient && (
      <div className="products-navbar-parent-wide">
        <div className="products-navbar-up">
          {productOptions.map((option) => {
            return productNameDynamic(option);
          })}
          <div className="products-navbar-search-container">
            <SearchIcon sx={{ color: "gray" }} />
            <input
              onChange={(e) => changeSearchQuery(e.target.value)}
              type="text"
              placeholder="Kërko produktet"
            />
          </div>
        </div>
        <div className="products-navbar-down">
          {productOptions.map((option) => {
            return (
              <Tooltip title={option.name}>
                <div
                  onClick={() => {
                    router.push(option.pathOnClick);
                  }}
                  className={isActiveOption(option.pathOnClick)}
                >
                  {option.icon}
                </div>
              </Tooltip>
            );
          })}
        </div>
      </div>
    )
  );
};

export default ProductsNavbar;
