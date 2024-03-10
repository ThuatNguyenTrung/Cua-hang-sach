import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRegisterUserMutation } from "../../redux/api/userApiSlice";
import { loginApi } from "../../redux/features/authSlice";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import Home from "../Home";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [register, { isLoading }] = useRegisterUserMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo && userInfo.user) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmpassword) {
        toast.error("Mật khẩu xác nhận không đúng");
        return;
      }
      const res = await register({ username, email, password }).unwrap();
      dispatch(loginApi(res.user));
      navigate("/");
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Home />
      <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-gray-900 text-white rounded-md duration-200 w-[400px]">
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-bold">Đăng kí</h1>
              <IoCloseOutline
                className="text-2xl cursor-pointer hover:text-secondary  duration-200 transition-all "
                onClick={() => navigate("/")}
              />
            </div>

            <form className="flex flex-col gap-3" onSubmit={submitHandler}>
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
              <button
                className="bg-primary text-white py-1 px-5 rounded-full my-7 block w-full hover:bg-primary/80 transition-200"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Đang đăng kí ..." : "Đăng kí"}
              </button>
              {isLoading && <Loader />}
            </form>

            <div className="flex gap-3 items-center">
              <div>Bạn đã có tài khoản?</div>
              <Link
                to="/login"
                onClick={() => window.scrollTo(0, 0)}
                className="text-primary font-semibold hover:text-secondary inline-block hover:scale-105 duration-200 transition-all"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
