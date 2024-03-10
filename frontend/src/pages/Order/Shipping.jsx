import { useEffect, useState } from "react";
import Progress from "../../components/Progress/Progress";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cartSlice";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [address, setAddress] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    if (cart.shippingAddress) {
      setAddress(cart.shippingAddress.address);
      setWard(cart.shippingAddress.ward);
      setDistrict(cart.shippingAddress.district);
      setCountry(cart.shippingAddress.country);
      setPhone(cart.shippingAddress.phone);
    }
  }, [cart.shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, ward, district, country, phone }));
    dispatch(savePaymentMethod(paymentMethod));
    if (address && ward && district && country && phone) {
      navigate("/checkout");
    } else {
      alert("Vui lòng điền đầy đủ thông tin");
    }
  };

  return (
    <div className="pt-20 pb-5 bg-dark min-h-[750px]">
      <div className="w-[400px] sm:w-[600px] mx-auto text-white  bg-black rounded-2xl p-5 space-y-5">
        <div>
          <Progress step1 step2 />
        </div>
        <div className="bg-slate-950 p-5 rounded-2xl">
          <h1 className="text-xl font-semibold text-center text-yellow-400">
            Thông tin giao hàng
          </h1>
          <form className="space-y-5 " onSubmit={submitHandler}>
            <div>
              <label htmlFor="address" className="input-label">
                {" "}
                Địa chỉ giao hàng
              </label>
              <input
                type="text"
                id="address"
                className="input"
                placeholder="Nhập địa điểm giao hàng"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="ward" className="input-label">
                Quận/Huyện
              </label>
              <input
                type="text"
                id="ward"
                className="input"
                placeholder="Nhập quận/ huyện"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="district" className="input-label">
                Tỉnh/Thành phố
              </label>
              <input
                type="text"
                id="district"
                className="input"
                placeholder="Nhập tỉnh/thành phố"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="country" className="input-label">
                Quốc gia
              </label>
              <input
                type="text"
                id="country"
                className="input"
                placeholder="Việt Nam"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="mobile" className="input-label">
                Số điện thoại
              </label>
              <input
                type="text"
                id="mobile"
                className="input"
                placeholder="Ví dụ : 0123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="payment" className="input-label">
                Phương thức thanh toán
              </label>
              <div className="flex space-x-5">
                <input
                  type="radio"
                  id="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                <label
                  htmlFor="payment"
                  className="hover:cursor-pointer hover:underline"
                >
                  Thanh toán khi nhận hàng
                </label>
              </div>
            </div>

            <button
              type="submit"
              onClick={() => {
                window.scroll(0, 0);
              }}
              className="bg-primary w-full hover:bg-secondary text-white px-5 py-2 rounded-full"
            >
              Tiếp tục
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
