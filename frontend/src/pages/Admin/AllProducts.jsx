import { useGetAllProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader/Loader";
import moment from "moment";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import formatPriceToVND from "./../../Utils/fomatPrice";

const AllProducts = () => {
  const { data: products, isLoading, refetch } = useGetAllProductsQuery();
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div className="pt-20 bg-dark min-h-screen">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="container text-white bg-slate-400 rounded-2xl p-5">
            <div className="text-2xl font-semibold mb-5 text-black">
              Tất cả sản phẩm ({products.length}){" "}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product._id}>
                  <div className="grid grid-cols-3 gap-2 bg-slate-900 rounded-2xl p-2">
                    <div>
                      <div className="overflow-hidden rounded-xl  flex items-center justify-center bg-slate-200 p-2">
                        <Link
                          to={`/product/${product._id}`}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          <img
                            src={product.image}
                            alt=""
                            className="min-w-[200px] h-[150px] object-contain-cover hover:scale-110 hover:skew-x-2 duration-700 transition"
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between ">
                      <Link
                        to={`/product/${product._id}`}
                        onClick={() => window.scrollTo(0, 0)}
                        className="hover:underline"
                      >
                        <h1 className="text-md line-clamp-3">{product.name}</h1>
                      </Link>

                      <div>
                        <p className="text-sm opacity-50">Tác giả: </p>
                        <p className="text-xs">{product.author}</p>
                      </div>
                      <Link
                        to={`/admin/update/product/${product._id}`}
                        onClick={() => window.scrollTo(0, 0)}
                        className="bg-primary hover:bg-secondary duration-200 transition-all text-white rounded-full px-3 py-1 text-sm text-center"
                      >
                        Cập nhật
                      </Link>
                    </div>
                    <div className="flex flex-col justify-between">
                      <p className="text-sm ml-5 opacity-50">
                        Ngày nhập:{" "}
                        {moment(product.createdAt).format("DD/MM/YYYY")}
                      </p>
                      <p className="text-xl ml-3 text-yellow-300">
                        Giá: {formatPriceToVND(product.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default AllProducts;
