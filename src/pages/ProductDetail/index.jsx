import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getProductComment,
  getProduct,
  postProductComment,
} from "../../service/api";
import { formatter, getImageProduct } from "../../util";
import { addToCart } from "../../redux/features/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [data, setData] = useState({}); // data input
  const cart = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(cart);

  const getComment = (id) => {
    getProductComment(id, {}).then(({ data }) => setComments(data.data.docs));
  };

  useEffect(() => {
    getProduct(id, {}).then(({ data }) => setProduct(data.data));
    getComment(id);
  }, [id]);

  const getDataInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const postComment = () => {
    postProductComment(id, data)
      .then(({ data }) => {
        if (data.status === "success") {
          setData({});
        }
        getComment(id);
      })
      .catch((err) => console.log(err));
  };

  const handleAddToCart = (type) => {
    if (product) {
      const { _id, name, price, image } = product;
      dispatch(addToCart({ _id, name, price, image, qty: 1 }));
      if (type === "buy-now") {
        navigate("/cart");
      }
    }
  };

  return (
    <>
      {/*	List Product	*/}
      <div id="product">
        <div id="product-head" className="row">
          <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
            <img src={getImageProduct(product?.image)} alt="" />
          </div>
          <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
            <h1>{product?.name}</h1>
            <ul>
              <li>
                <span>Bảo hành:</span> {product?.warranty}
              </li>
              <li>
                <span>Đi kèm:</span> {product?.accessories}
              </li>
              <li>
                <span>Tình trạng:</span> {product?.status}
              </li>
              <li>
                <span>Khuyến Mại:</span> {product?.promotion}
              </li>
              <li id="price">Giá Bán (chưa bao gồm VAT)</li>
              <li id="price-number">{formatter.format(product?.price)}</li>
              <li id="status" style={product?.is_stock ? {} : { color: "red" }}>
                {product?.is_stock ? "Còn hàng" : "Hết hàng"}
              </li>
            </ul>

            {product?.is_stock ? (
              <div id="add-cart">
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => handleAddToCart("buy-now")}
                >
                  Mua ngay
                </button>

                <button onClick={handleAddToCart} className="btn btn-info">
                  Thêm vào giỏ hàng
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div id="product-body" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Đánh giá về {product?.name}</h3>
            <p>{product?.details}</p>
          </div>
        </div>
        {/*	Comment	*/}
        <div id="comment" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Bình luận sản phẩm</h3>
            <div className="form-group">
              <label>Tên:</label>
              <input
                name="name"
                required
                type="text"
                className="form-control"
                value={data?.name || ""}
                onChange={getDataInput}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                name="email"
                required
                type="email"
                className="form-control"
                id="pwd"
                value={data?.email || ""}
                onChange={getDataInput}
              />
            </div>
            <div className="form-group">
              <label>Nội dung:</label>
              <textarea
                name="content"
                required
                rows={8}
                className="form-control"
                value={data?.content || ""}
                onChange={getDataInput}
              />
            </div>
            <button
              type="button"
              name="sbm"
              className="btn btn-primary"
              onClick={postComment}
            >
              Gửi
            </button>
          </div>
        </div>
        {/*	End Comment	*/}
        {/*	Comments List	*/}
        <div id="comments-list" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            {comments.length > 0 ? (
              comments.map((cmt) => (
                <div className="comment-item" key={cmt._id}>
                  <ul>
                    <li>
                      <b>{cmt?.name}</b>
                    </li>
                    <li>{moment(cmt?.updatedAt).fromNow()}</li>
                    <li>
                      <p>{cmt?.content}</p>
                    </li>
                  </ul>
                </div>
              ))
            ) : (
              <div className="comment-item">
                <ul>
                  <li>Không có bình luận nào</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/*	End Comments List	*/}
      </div>
    </>
  );
};

export default ProductDetail;
