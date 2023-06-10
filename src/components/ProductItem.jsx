import React, { useState } from "react";
import { Link } from "react-router-dom";

import { getImageProduct, formatter } from "../util";

const ProductItem = ({ data }) => {
  return (
    <div className="product-item card text-center">
      <Link to={`/product/${data._id}`}>
        <img src={getImageProduct(data.image)} alt={data.name} />
      </Link>
      <h4>
        <Link to={`/product/${data._id}`}>{data.name}</Link>
      </h4>
      <p>
        Giá Bán: <span>{formatter.format(data.price)}</span>
      </p>
    </div>
  );
};

export default ProductItem;
