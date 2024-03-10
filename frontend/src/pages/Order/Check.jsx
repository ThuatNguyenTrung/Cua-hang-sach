import Progress from "../../components/Progress/Progress";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import formatPriceToVND from "./../../Utils/fomatPrice";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { toast } from "react-toastify";
import { clearCart } from "../../redux/features/cartSlice";

const Check = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const [createOrder] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const data = {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemPrices,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      };
      const res = await createOrder(data).unwrap();

      toast.success(res.message);
      dispatch(clearCart());
      navigate(`/order/${res.order._id}`);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <div className="pt-20 p-5 bg-dark min-h-screen lg:px-[200px]">
        <div className="container text-white  bg-black rounded-2xl p-5 space-y-5">
          <div>
            <Progress step1 step2 step3 />
          </div>
          <div>
            {cart.cartItems.map((item) => (
              <div key={item._id} className="bg-slate-900 p-2 rounded-xl mb-2">
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <div className="col-span-2 flex items-center space-x-3 ">
                    <div className="w-[100px] h-[150px] bg-slate-200 rounded-xl p-1">
                      <Link
                        to={`/product/${item._id}`}
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover hover:scale-105 duration-300"
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col gap-8">
                      <Link
                        to={`/product/${item._id}`}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <h1 className="text-xl font-semibold hover:underline">
                          {item.name}
                        </h1>
                      </Link>

                      <p className="text-yellow-400 font-bold text-xl">
                        <span className="text-sm font-normal text-white opacity-50">
                          Giá:{" "}
                        </span>
                        {formatPriceToVND(item.price)}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1 flex flex-col justify-center sm:gap-8 mt-3 sm:mt-0">
                    <p className="text-sm ">
                      Số lượng:{" "}
                      <span className="text-yellow-400 text-xl ">
                        {item.quantity}
                      </span>
                    </p>
                    <p className="text-sm ">
                      Tổng:{" "}
                      <span className="text-yellow-400 text-xl ">
                        {formatPriceToVND(item.price * item.quantity)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-700 p-5 rounded-xl ">
            <h1 className="text-xl font-semibold text-center ">
              Tóm tắt đơn hàng
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2 bg-slate-950 p-5 rounded-xl">
              <div className="flex flex-col gap-2">
                <p>
                  Tiền đơn hàng:{" "}
                  <strong className="text-pink-500">
                    {formatPriceToVND(cart.itemPrices)}
                  </strong>{" "}
                </p>
                <p>
                  Phí vận chuyển:{" "}
                  <strong className="text-pink-500">
                    {formatPriceToVND(cart.shippingPrice)}
                  </strong>
                </p>
                <p>
                  Thuế VAT:{" "}
                  <strong className="text-pink-500">
                    {formatPriceToVND(cart.taxPrice)}
                  </strong>
                </p>
                <p>
                  Tổng Tiền:{" "}
                  <strong className="text-pink-500">
                    {formatPriceToVND(cart.totalPrice)}
                  </strong>
                </p>
              </div>
              <div>
                <div>
                  <strong className="text-pink-500">Địa chỉ giao hàng: </strong>
                  <p>
                    {cart.shippingAddress.address}, {cart.shippingAddress.ward},{" "}
                    {cart.shippingAddress.district},
                    {cart.shippingAddress.country}
                  </p>
                </div>
                <p>
                  <strong className="text-pink-500">Số điện thoại: </strong>{" "}
                  {cart.shippingAddress.phone}
                </p>
                <p>
                  <strong className="text-pink-500">Thanh toán: </strong>
                  {cart.paymentMethod}
                </p>
              </div>
            </div>
          </div>
          <div className="px-5">
            <button
              className="bg-primary text-white w-full py-2 rounded-full hover:scale-105 duration-300"
              onClick={placeOrderHandler}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Check;
