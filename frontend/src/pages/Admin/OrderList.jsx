import { Link } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../redux/api/orderApiSlice";
import Loader from "../../components/Loader/Loader";
import formatPriceToVND from "../../Utils/fomatPrice";
import { toast } from "react-toastify";
import {
  useMarkOrderAsDeliveredMutation,
  useMarkOrderAsPaidMutation,
} from "../../redux/api/orderApiSlice";

const OrderList = () => {
  const { data: orders, isLoading, refetch } = useGetAllOrdersQuery();

  const [markOrderAsPaid] = useMarkOrderAsPaidMutation();
  const [markOrderAsDelivered] = useMarkOrderAsDeliveredMutation();

  if (isLoading) {
    return <Loader />;
  }

  const deliverOrderHandler = async (id) => {
    await markOrderAsDelivered(id);
    refetch();
    toast.success("Đã giao đơn hàng");
  };
  const paidOrderHandler = async (id) => {
    await markOrderAsPaid(id);
    refetch();
    toast.success("Đã thanh toán đơn hàng");
  };
  return (
    <>
      <div className="pt-20 min-h-screen bg-dark pb-5">
        <div className="container text-white  bg-black rounded-2xl p-5 lg:px-20 space-y-5">
          <div className="text-xl font-semibold backdrop: text-yellow-400 ">
            Danh sách đơn hàng: ({orders.length})
          </div>
          <div>
            {orders.map((order) => (
              <div key={order._id}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 bg-slate-900 p-3 rounded-md m-1 text-white">
                  <div className="flex items-center gap-5">
                    <div className="overflow-hidden w-32 h-40 p-1 bg-slate-50 rounded-md">
                      <img
                        src={order?.orderItems[0].image}
                        className="w-full h-full object-cover  rounded-md hover:scale-105 duration-200 transition-all"
                        alt="image"
                      />
                    </div>
                    <p>
                      <strong>ID: </strong> {order._id}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center space-y-3">
                    <p>
                      <strong>Thời gian:</strong> {order.createdAt}
                    </p>
                    <p>
                      <strong>Tổng tiền:</strong>{" "}
                      {formatPriceToVND(order.totalPrice)}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col justify-center space-y-3 items-center">
                      <strong>Thanh toán </strong>{" "}
                      {order.isPaid ? (
                        <p className="p-1 text-sm text-center bg-green-400 w-[110px]  rounded-full">
                          Hoàn thành
                        </p>
                      ) : (
                        <p
                          onClick={() => paidOrderHandler(order._id)}
                          className="p-1 text-sm text-center bg-red-400 w-[115px] hover:cursor-pointer  rounded-full"
                        >
                          Chưa thanh toán
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col justify-center space-y-3 items-center">
                      <strong>Giao hàng </strong>{" "}
                      {order.isDelivered ? (
                        <p className="p-1 text-sm text-center bg-green-400  w-[110px] rounded-full">
                          Hoàn thành
                        </p>
                      ) : (
                        <p
                          onClick={() => deliverOrderHandler(order._id)}
                          className="hover:cursor-pointer p-1 text-sm text-center bg-red-400  w-[110px] rounded-full"
                        >
                          Đang giao hàng
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col justify-center space-y-3 items-center">
                      <Link
                        to={`/order/${order._id}`}
                        className="hover:scale-105 duration-200 transition-all"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <p className="p-1 mt-9 text-sm text-black text-center bg-yellow-400  w-[110px] rounded-full">
                          Xem chi tiết
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderList;
