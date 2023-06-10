import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../../service/api";
import ProductItem from "../../components/ProductItem";

const Home = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [featureProducts, setFeatureProducts] = useState([]);

  useEffect(() => {
    //Get All Products
    getProducts({ params: { limit: 9 } })
      .then(({ data }) => {
        setNewProducts(data.data.docs);
      })
      .catch((err) => console.log(err));

    //Get Feature products
    getProducts({
      params: {
        "filter[is_featured]": true,
        limit: 9,
      },
    })
      .then(({ data }) => {
        setFeatureProducts(data.data.docs);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list card-deck">
          {featureProducts.map((product) => (
            <ProductItem key={product._id} data={product} />
          ))}
        </div>
      </div>

      <div className="products">
        <h3>Sản phẩm mới</h3>
        <div className="product-list card-deck">
          {newProducts.map((product) => (
            <ProductItem key={product._id} data={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
