import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AiOutlineLogin,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import ResponsiveMenu from "./ResponsiveMenu";
import { useLogoutUserMutation } from "../../redux/api/userApiSlice";
import { logoutApi } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const NavbarLink = [
  {
    id: 1,
    name: "Trang chủ",
    link: "/",
  },
  {
    id: 2,
    name: "Sản phẩm",
    link: "/products",
  },
  {
    id: 3,
    name: "Giới thiệu",
    link: "/introduce",
  },
  {
    id: 4,
    name: "Giỏ hàng",
    link: "/carts",
  },
];
export const DropdownLink = [
  {
    id: 1,
    name: "Sản phẩm",
    link: "admin/createproduct",
  },
  {
    id: 2,
    name: "Danh mục",
    link: "admin/categorylist",
  },
  {
    id: 3,
    name: "Đơn hàng",
    link: "admin/orderlist",
  },
  {
    id: 4,
    name: "Danh sách tài khoản",
    link: "admin/userlist",
  },
  {
    id: 5,
    name: "Tất cả sản phẩm",
    link: "admin/allproductlist",
  },
];
const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const cartItemsCount = cart?.cartItems?.length;

  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutUserMutation();

  const logoutHandler = async () => {
    try {
      const res = await logoutUser().unwrap();

      dispatch(logoutApi());
      navigate("/login");
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <nav className="fixed top-0 right-0 w-full z-50 bg-slate-800 text-white shadow-md py-4">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <Link
                to={"/"}
                className=" text-2xl sm:text-3xl font-bold tracking-wider"
              >
                TBOOK
              </Link>
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center gap-6">
                {NavbarLink.map(({ id, name, link }) => (
                  <li
                    key={id}
                    className="text-xl font-semibold hover:text-primary hover:border-b-2 hover:border-secondary transition-colors duration-500"
                  >
                    <NavLink
                      onClick={() => window.scrollTo(0, 0)}
                      to={link}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      {name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Link
                to={"/carts"}
                onClick={() => window.scrollTo(0, 0)}
                className="relative"
              >
                <AiOutlineShoppingCart className="text-2xl hover:scale-110 transition-all duration-200 hover:text-primary" />
                {cartItemsCount > 0 && (
                  <div className="absolute -top-1/2 -right-1/3 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                    {cartItemsCount}
                  </div>
                )}
              </Link>
            </div>
            {!userInfo ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  onClick={() => window.scrollTo(0, 0)}
                  className="flex items-center gap-2 group hover:text-secondary font-semibold hover:scale-105 duration-200 transition-all"
                >
                  <p className="font-semibold hidden group-hover:block text-sm  ">
                    Đăng nhập
                  </p>
                  <AiOutlineLogin className="text-xl " />
                </Link>
                <Link
                  to="/register"
                  onClick={() => window.scrollTo(0, 0)}
                  className="flex items-center gap-2 group hover:text-secondary font-semibold hover:scale-105 duration-200 transition-all"
                >
                  <p className="font-semibold hidden group-hover:block text-sm  ">
                    Đăng kí
                  </p>
                  <AiOutlineUserAdd className="text-xl " />
                </Link>
              </div>
            ) : (
              <div className="group relative cursor-pointer">
                <div className="flex items-center gap-1">
                  <p className="text-sm">Xin chào:</p>
                  <p className="font-semibold capitalize">
                    {userInfo.username}
                  </p>
                  <FaCaretDown className="group-hover:rotate-180 transition-all duration-200" />
                </div>
                <div className="hidden group-hover:block absolute top-5 right-0 z-99 bg-slate-700 p-3 rounded-md w-[200px]">
                  <ul>
                    {userInfo.isAdmin &&
                      DropdownLink.map(({ id, name, link }) => (
                        <li
                          key={id}
                          className=" hover:bg-primary/100 p-2 rounded-md hover:scale-105 transition-all duration-200"
                        >
                          <Link to={link} onClick={() => window.scrollTo(0, 0)}>
                            <p>{name}</p>
                          </Link>
                        </li>
                      ))}
                    <li className=" hover:bg-primary/100 p-2 rounded-md hover:scale-105 transition-all duration-200">
                      <Link to="/profile" onClick={() => window.scrollTo(0, 0)}>
                        <p>Tài khoản của bạn</p>
                      </Link>
                    </li>
                    <li className=" hover:bg-primary/100 p-2 rounded-md hover:scale-105 transition-all duration-200">
                      <Link onClick={logoutHandler}>
                        <p>Đăng xuất</p>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            <div className="md:hidden block">
              {!showMenu ? (
                <HiMenuAlt1
                  onClick={toggleMenu}
                  className="text-3xl cursor-pointer hover:text-primary  duration-200 transition-all "
                />
              ) : (
                <HiMenuAlt3
                  onClick={toggleMenu}
                  className="text-3xl cursor-pointer hover:text-primary  duration-200 transition-all "
                />
              )}
            </div>
          </div>
        </div>
        <ResponsiveMenu
          showMenu={showMenu}
          toggleMenu={toggleMenu}
          userInfo={userInfo}
        />
      </nav>
    </>
  );
};
export default Navbar;
