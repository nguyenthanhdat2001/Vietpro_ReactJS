import { BrowserRouter, Routes, Route } from "react-router-dom";
//import layout
import Header from "./layout/Header";
import Menu from "./layout/Menu";
import Sidebar from "./layout/Sidebar";
import Slider from "./layout/Slider";
import Footer from "./layout/Footer";
//import pages
import Page404 from "./pages/NotFound";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Product from "./pages/ProductDetail";
import Search from "./pages/Search";
import Success from "./pages/Success";
import { useEffect, useState } from "react";
import { getCategories } from "./service/api";

function App() {

  const [menu, setMenu] = useState([])

  useEffect(()=> {
    getCategories({}).then(({data})=>{
      setMenu(data.data.docs)
    }).catch(err => console.log(err))
  },[])


  return (
    <BrowserRouter>
      <Header />
      {/* <!--	Body	--> */}
      <div id="body">
        <div className="container">
          <Menu menu={menu}/>
          <div className="row">
            <div id="main" className="col-lg-8 col-md-12 col-sm-12">
              <Slider />
              <div>
                <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/cart" element={<Cart />}></Route>
                  <Route path="/categories/:id" element={<Category />}></Route>
                  <Route path="/product/:id" element={<Product />}></Route>
                  <Route path="/success" element={<Success />}></Route>
                  <Route path="/search" element={<Search />}></Route>
                  <Route path="*" element={<Page404 />}></Route>
                </Routes>
              </div>
            </div>
            <Sidebar />
          </div>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
