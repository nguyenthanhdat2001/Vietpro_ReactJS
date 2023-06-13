import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatter, getImageProduct } from "../../util";
import {
  updateCart,
  deleteCart,
  clearCart,
} from "../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";
import { postOrder } from "../../service/api";

const Cart = () => {
  const cart = useSelector(({ cart }) => cart.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const order = (e) => {
    e.preventDefault();
    const items = cart.map((item) => {
      return {
        prd_id: item._id,
        qty: item.qty,
      };
    });
    postOrder({ ...data, items }).then(({ data }) => {
      if (data.status === "success") {
        dispatch(clearCart());
        navigate("/success");
      }
    });
  };

  const handleUpdateCart = (e, id) => {
    let val = parseInt(e.target.value);
    if (val <= 0) {
      // eslint-disable-next-line no-restricted-globals
      const del = confirm("Delele ?");
      return del ? dispatch(deleteCart(id)) : (val = 1);
    }
    dispatch(updateCart({ _id: id, qty: val }));
  };

  return (
    <>
      <div>
        {/*	Cart	*/}
        <div id="my-cart">
          <div className="row">
            <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
              Thông tin sản phẩm
            </div>
            <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
              Tùy chọn
            </div>
            <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
          </div>
          {cart.map((item) => (
            <div className="cart-item row" key={item._id}>
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                <img src={getImageProduct(item.image)} alt="" />
                <h4>{item.name}</h4>
              </div>
              <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                <input
                  type="number"
                  id="quantity"
                  className="form-control form-blue quantity"
                  value={item.qty}
                  min={0}
                  onChange={(e) => handleUpdateCart(e, item._id)}
                />
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>{formatter.format(item.qty * item.price)}</b>
                <button
                  onClick={() => dispatch(deleteCart(item._id))}
                  className="btn btn-secondary"
                  type="button"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
          <div className="row">
            <div className="cart-total col-lg-9 col-md-9 col-sm-12">
              <b>Tổng cộng:</b>
            </div>
            <div className="cart-price col-lg-3 col-md-3 col-sm-12">
              <b>
                {formatter.format(
                  cart.reduce((total, item) => total + item.price * item.qty, 0)
                )}
              </b>
            </div>
          </div>
        </div>
        {/*	End Cart	*/}
        {/*	Customer Info	*/}
        <div id="customer">
          <form method="post">
            <div className="row">
              <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  placeholder="Họ và tên (bắt buộc)"
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={handleInput}
                  value={data?.name || ""}
                  required
                />
              </div>
              <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  placeholder="Số điện thoại (bắt buộc)"
                  type="text"
                  name="phone"
                  className="form-control"
                  onChange={handleInput}
                  value={data?.phone || ""}
                  required
                />
              </div>
              <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  placeholder="Email (bắt buộc)"
                  type="text"
                  name="email"
                  className="form-control"
                  onChange={handleInput}
                  value={data?.email || ""}
                  required
                />
              </div>
              <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                <input
                  placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                  type="text"
                  name="address"
                  className="form-control"
                  onChange={handleInput}
                  value={data?.address || ""}
                  required
                />
              </div>
            </div>
          </form>
          <div className="row">
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <a href="#" onClick={order}>
                <b>Mua ngay</b>
                <span>Giao hàng tận nơi siêu tốc</span>
              </a>
            </div>
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <a href="#">
                <b>Trả góp Online</b>
                <span>Vui lòng call (+84) 0988 550 553</span>
              </a>
            </div>
          </div>
        </div>
        {/*	End Customer Info	*/}
      </div>
    </>
  );
};

export default Cart;
