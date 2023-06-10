import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { getCategory, getProductCategory } from "../../service/api";
import ProductItem from "../../components/ProductItem";
import Pagination from "../../components/Pagination";

const Category = () => {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState(null);
  const [products, setProducts] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const [pages, setPages] = useState({
    limit: 12,
    page: page,
  });

  useEffect(() => {
    getCategory(id, {})
      .then(({ data }) => setCategoryName(data.data))
      .catch((err) => console.log(err));

    getProductCategory(id, {
      params: {
        page: page,
        limit: 12,
      },
    })
      .then(({ data }) => {
        setProducts(data.data.docs);
        setPages({ ...pages, ...data.data.pages });
      })
      .catch((err) => console.log(err));
  }, [id, pages]);

  // console.log(products)

  return (
    <>
      <div>
        <div className="products">
          <h3>{categoryName?.name}</h3>
          <div className="product-list card-deck">
            {products.map((item) => (
              <ProductItem key={item._id} data={item} />
            ))}
          </div>
        </div>
        {/*	End List Product	*/}
        <Pagination pages={pages} />
      </div>
    </>
  );
};

export default Category;
