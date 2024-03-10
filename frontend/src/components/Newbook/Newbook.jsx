import Loader from "../Loader/Loader";
import { useGetNewProductsQuery } from "../../redux/api/productApiSlice";

import ProductCard from "../../pages/Product/ProductCard";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Newbook = () => {
  const { data: products, isLoading, refetch } = useGetNewProductsQuery();
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <>
      <div className="py-10 bg-dark">
        <div className="container text-center text-white">
          <div
            data-aos="flip-down"
            data-aos-duration="1000"
            className="font-merienda text-3xl font-bold mb-5 text-slate-900"
          >
            Những cuốn sách mới nhất
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-5">
                {/* Card */}
                {products.map((product) => (
                  <div
                    data-aos="slide-up"
                    data-aos-delay={products.indexOf(product) * 100}
                    key={product._id}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <Link
                  data-aos="slide-up"
                  data-aos-delay="600"
                  to="/products"
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-center mt-10 cursor-pointer  bg-primary text-white py-1 px-5 rounded-md"
                >
                  Xem thêm
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Newbook;
