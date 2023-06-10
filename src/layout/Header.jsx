import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const totalCart = useSelector(({ cart }) =>
    cart.data.reduce((total, item) => {
      return total + parseInt(item.qty);
    }, 0)
  );
  const [searchString, setSearchString] = useState("");
  const navigate = useNavigate();
  const search = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchString}`);
  };

  return (
    <div id="header">
      <div className="container">
        <div className="row">
          <div id="logo" className="col-lg-3 col-md-3 col-sm-12">
            <h1>
              <Link to="/">
                <img className="img-fluid" src="images/logo.png" alt="" />
              </Link>
            </h1>
          </div>
          <div id="search" className="col-lg-6 col-md-6 col-sm-12">
            <form className="form-inline">
              <input
                className="form-control mt-3"
                type="search"
                placeholder="Tìm kiếm"
                aria-label="Search"
                onChange={(e) => setSearchString(e.target.value)}
              />
              <button
                className="btn btn-danger mt-3"
                type="submit"
                onClick={search}
              >
                Tìm kiếm
              </button>
            </form>
          </div>
          <div id="cart" className="col-lg-3 col-md-3 col-sm-12">
            <Link className="mt-4 mr-2" to="/cart ">
              giỏ hàng
            </Link>
            <span className="mt-3">{totalCart}</span>
          </div>
        </div>
      </div>
      {/* Toggler/collapsibe Button */}
      <button
        className="navbar-toggler navbar-light"
        type="button"
        data-toggle="collapse"
        data-target="#menu"
      >
        <span className="navbar-toggler-icon" />
      </button>
    </div>
  );
};

export default Header;
