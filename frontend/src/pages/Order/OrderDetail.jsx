import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../redux/api/orderApiSlice";
import Loader from "./../../components/Loader/Loader";
import formatPriceToVND from "./../../Utils/fomatPrice";

const OrderDetail = () => {
  const { id } = useParams();
  const { data: order, isLoading } = useGetOrderByIdQuery(id);
  console.log(order);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="pt-20 min-h-[750px] bg-dark pb-5">
        <div className="container text-white  bg-black rounded-2xl p-5 lg:px-20 space-y-5">
          <Link
            to="/products"
            onClick={() => window.scrollTo(0, 0)}
            className="text-xl font-semibold backdrop: text-yellow-400 hover:underline"
          >
            Tiếp tục mua sắm
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              {order.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center bg-slate-900 rounded-2xl p-5 mb-5 space-x-10"
                >
                  <div className="w-28 h-40 bg-slate-200 p-2 rounded-lg">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover rounded-lg hover:scale-105 duration-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <h1 className="text-lg text-yellow-400 line-clamp-1">
                      {item.name}
                    </h1>

                    <p>Số lượng: {item.quantity}</p>
                    <p>
                      Giá:{" "}
                      <strong className="text-pink-500 text-lg">
                        {formatPriceToVND(item.price)}
                      </strong>
                    </p>
                    <p>
                      Tổng tiền:{" "}
                      <strong className="text-pink-500 text-lg">
                        {formatPriceToVND(item.price * item.quantity)}
                      </strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Right */}
            <div className="bg-slate-900 rounded-2xl p-5 space-y-5">
              <div className="space-y-3 border p-5">
                <h1 className="text-xl font-semibold text-center text-yellow-400">
                  Thông tin giao hàng
                </h1>
                <div className="space-y-3">
                  <h1>
                    <strong className="text-pink-500">Mã đơn hàng: </strong>
                    {order._id}
                  </h1>
                  <h1>
                    <strong className="text-pink-500">Tên: </strong>
                    {order.user.username}
                  </h1>
                  <h1>
                    <strong className="text-pink-500">Email: </strong>
                    {order.user.email}
                  </h1>
                  <h1>
                    <strong className="text-pink-500">Số điện thoại: </strong>
                    {order.shippingAddress.phone}
                  </h1>
                  <h1>
                    <strong className="text-pink-500">Địa chỉ: </strong>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.ward},{" "}
                    {order.shippingAddress.district},{" "}
                    {order.shippingAddress.country}
                  </h1>
                  <h1>
                    <strong className="text-pink-500">
                      Phương thức giao hàng:{" "}
                    </strong>
                    {order.paymentMethod}
                  </h1>
                </div>
              </div>
              <div className="space-y-3 border p-5">
                <h1 className="text-xl font-semibold text-center text-yellow-400">
                  Thông tin đơn hàng
                </h1>
                <div className="space-y-3">
                  <h1>
                    <strong className="text-pink-500">Giá tiền: </strong>
                    {formatPriceToVND(order.itemsPrice)}
                  </h1>
                  <h1>
                    <strong className="text-pink-500">Phí giao hàng: </strong>
                    {formatPriceToVND(order.shippingPrice)}
                  </h1>
                  <h1>
                    <strong className="text-pink-500">Thuế VAT: </strong>
                    {formatPriceToVND(order.taxPrice)}
                  </h1>
                  <h1>
                    <strong className="text-pink-500">
                      Tổng tiền thanh toán:{" "}
                    </strong>
                    {formatPriceToVND(order.totalPrice)}
                  </h1>
                </div>
              </div>
              <div className="space-y-3 bg-black p-5 rounded-md font-bold text-center">
                {order.isPaid ? (
                  <div className="text-green-500">Đơn hàng đã thanh toán</div>
                ) : (
                  <div className="text-red-500">Đơn hàng chưa thanh toán</div>
                )}
              </div>
              <div className="space-y-3 bg-black p-5 rounded-md font-bold text-center">
                {order.isDelivered ? (
                  <div className="text-green-500">Đơn hàng đã giao</div>
                ) : (
                  <div className="text-red-500">Thanh toán khi nhận hàng</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderDetail;
