import { Link } from "react-router-dom";
import { NavbarLink } from "./Navbar";
import { FaUserCircle } from "react-icons/fa";
const ResponsiveMenu = ({ showMenu, toggleMenu, userInfo }) => {
  return (
    <div
      className={` ${
        showMenu ? "left-0" : "left-[-100%]"
      } fixed top-0 bottom-0 bg-slate-800 w-[70%] z-50 duration-300 ease-in-out md:hidden shadow-md text-white p-6 flex flex-col justify-between`}
    >
      <div className="mt-10 ml-4 flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <FaUserCircle className="text-5xl" />
          <div className="flex flex-col items-center">
            <h1>Xin chào</h1>
            {userInfo && (
              <p className="capitalize font-semibold hover:text-primary cursor-pointer hover:scale-105 duration-200 transition-all">
                {userInfo.username}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-10">
          {NavbarLink.map(({ id, name, link }) => (
            <Link
              key={id}
              to={link}
              onClick={() => toggleMenu()}
              className="p-2 w-full rounded-md hover:bg-primary cursor-pointer hover:scale-105 duration-200 transition-all"
            >
              <p>{name}</p>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h1>
          Trang web được tạo bởi{" "}
          <strong className="hover:text-primary duration-200 transition-all cursor-pointer">
            THUẬT
          </strong>
        </h1>
      </div>
    </div>
  );
};
export default ResponsiveMenu;
