import React from "react";
import { Link } from "react-router-dom";

const Menu = ({menu}) => {
  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <nav>
          <div id="menu" className="collapse navbar-collapse">
            <ul>
              {menu && menu.map((item) => (
                <li className="menu-item" key={item._id}>
                  <Link to={`categories/${item._id}`}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
