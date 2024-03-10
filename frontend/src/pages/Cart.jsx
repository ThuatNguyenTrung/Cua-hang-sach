import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import formatPriceToVND from "../Utils/fomatPrice";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const removeCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, quantity: qty }));
  };

  return (
    <>
      <div className="min-h-[750px] bg-dark pt-20 lg:px-[200px]">
        {cart?.cartItems?.length === 0 ? (
          <div
            data-aos="flip-down"
            className="text-center text-slate-950 font-semibold mt-10"
          >
            Giỏ hàng của bạn trống{" "}
            <Link
              to={"/products"}
              onClick={() => window.scrollTo(0, 0)}
              className="text-red-500 font-bold hover:underline"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div
            data-aos="zoom-out"
            className="container  bg-black rounded-2xl p-5 text-white"
          >
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="mb-5 text-xl font-semibold text-center text-yellow-400"
            >
              Giỏ hàng
            </div>
            {cart?.cartItems?.map((item) => (
              <div
                key={item._id}
                className="flex flex-wrap justify-between items-center bg-slate-900 p-5 rounded-xl mb-5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-[100px] h-[150px] bg-slate-100 p-1 rounded-xl overflow-hidden">
                    <Link
                      to={`/product/${item._id}`}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover hover:scale-110 duration-200 hover:skew-x-2"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col gap-7">
                    <Link
                      to={`/product/${item._id}`}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <h1 className="text-xl hover:underline">{item.name}</h1>
                    </Link>
                    <p className="text-sm opacity-60">{item.author}</p>
                    <p className="text-yellow-400 text-xl font-bold">
                      {formatPriceToVND(item.price)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-5 mr-10 mt-5 sm:mt-0">
                  <select
                    name="qty"
                    id="qty"
                    className="input"
                    value={item.quantity}
                    onChange={(e) => addToCartHandler(item, e.target.value)}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option value={x + 1} key={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <div>
                    <button
                      className="text-red-500 hover:text-red-300 hover:scale-150 duration-200 transition-all"
                      onClick={() => removeCartHandler(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-slate-800 p-5 rounded-xl space-y-5">
              <p>
                Số lượng:{" "}
                {cart.cartItems.reduce(
                  (acc, item) => acc + Number(item.quantity),
                  0
                )}
              </p>
              <p>
                Tổng tiền:{" "}
                {formatPriceToVND(
                  cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
                )}
              </p>
              <div className="mx-10">
                <button
                  className="bg-primary text-white w-full  py-1 rounded-full hover:scale-105 duration-200"
                  onClick={() => {
                    navigate("/login?redirect=/shipping");
                    window.scrollTo(0, 0);
                  }}
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Cart;
