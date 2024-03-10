import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./pages/Auth/PrivateRoute";
import Profile from "./pages/User/Profile";
import AdminRoute from "./pages/Admin/AdminRoute";
import UserList from "./pages/Admin/UserList";
import CategoryList from "./pages/Admin/CategoryList";
import CreateProduct from "./pages/Admin/CreateProduct";
import AllProducts from "./pages/Admin/AllProducts";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import ProductDetail from "./pages/Product/ProductDetail";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Shipping from "./pages/Order/Shipping";
import Check from "./pages/Order/Check";
import OrderDetail from "./pages/Order/OrderDetail";
import OrderUser from "./pages/User/OrderUser";
import OrderList from "./pages/Admin/OrderList";
import Introduce from "./pages/Introduce";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="products" element={<Shop />} />
            <Route path="/carts" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/checkout" element={<Check />} />
            <Route path="/order/:id" element={<OrderDetail />} />
            <Route path="/introduce" element={<Introduce />} />

            <Route path="" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/user-orders" element={<OrderUser />} />
            </Route>
            <Route path="/admin" element={<AdminRoute />}>
              <Route path="/admin/userlist" element={<UserList />} />
              <Route path="/admin/categorylist" element={<CategoryList />} />
              <Route path="/admin/createproduct" element={<CreateProduct />} />
              <Route path="/admin/allproductlist" element={<AllProducts />} />
              <Route
                path="/admin/update/product/:id"
                element={<UpdateProduct />}
              />
              <Route path="/admin/orderlist" element={<OrderList />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
