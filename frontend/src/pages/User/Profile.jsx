import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetProfileQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApiSlice";
import Loader from "../../components/Loader/Loader";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginApi } from "../../redux/features/authSlice";
import Home from "../Home";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [updated, { isLoading }] = useUpdateUserMutation();
  const { data: user, isLoading: loadingUser } = useGetProfileQuery();

  useEffect(() => {
    if (!loadingUser && user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user, loadingUser]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmpassword) {
        toast.error("Mật khẩu xác nhận không đúng");
        return;
      }
      const res = await updated({ username, email, password }).unwrap();
      dispatch(loginApi(res.user));
      navigate("/");
      toast.success(res.message);
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      <Home />
      <div className="h-screen w-screen fixed flex justify-center items-center top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
        <div className="w-[400px] text-white bg-slate-900 rounded-xl p-2">
          <div className="p-4">
            <div className="flex justify-between items-center ">
              <h1 className="text-2xl font-semibold">Cập nhật tài khoản</h1>
              <IoCloseOutline
                className="text-2xl cursor-pointer hover:text-secondary  duration-200 transition-all "
                onClick={() => navigate("/")}
              />
            </div>

            <form className="mt-5" onSubmit={submitHandler}>
              <div>
                <label htmlFor="username" className="input-label">
                  Tên
                </label>
                <input
                  type="text"
                  id="username"
                  className="input"
                  placeholder="Nhập tên ... "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="input"
                  placeholder="Nhập email ..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="input-label">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  className="input"
                  placeholder="Nhập mật khẩu ..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirmpassword" className="input-label">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="confirmpassword"
                  className="input"
                  placeholder="Nhập lại mật khẩu ..."
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-between mt-5">
                <button
                  className="bg-primary text-white py-1 px-5 rounded-full   hover:bg-primary/80 transition-200"
                  type="submit"
                >
                  {isLoading ? <Loader /> : "Cập nhật"}
                </button>
                <Link
                  className="bg-primary text-white py-1 px-5 rounded-full  hover:bg-primary/80 transition-200"
                  to="/user-orders"
                >
                  Đơn hàng của tôi
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
