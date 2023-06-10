import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../service/api";

import ProductItem from "../../components/ProductItem";
import Pagination from "../../components/Pagination";

const Search = () => {
  const [searchProduct, setSearchProduct] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("q");
  const page = searchParams.get("page") || 1;

  const [pages, setPages] = useState({
    limit: 12,
    currentPage: page,
    total: 0,
  });

  useEffect(() => {
    getProducts({
      params: {
        name: keyword,
        page: page,
        limit: 12,
      },
    }).then(({ data }) => {
      setSearchProduct(data.data.docs);
      setPages({ ...pages, ...data.data.pages });
    });
  }, [keyword, page]);

  console.log(pages);

  return (
    <>
      <div>
        {/*	List Product	*/}
        <div className="products">
          <div id="search-result">
            Kết quả tìm kiếm với sản phẩm <span>{keyword}</span>
          </div>
          <div className="product-list card-deck">
            {searchProduct.map((item) => (
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

export default Search;
