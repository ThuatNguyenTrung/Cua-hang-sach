import { GrSecure } from "react-icons/gr";
import { MdOutlinePayments } from "react-icons/md";
import { GiFoodTruck } from "react-icons/gi";
import { AiOutlineGift } from "react-icons/ai";

import BookImg from "../../../../uploads/images/bookshelf-413705_1280.jpg";
import Banner from "../../../../uploads/images/books-5433432_1280.jpg";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../Loader/Loader";
import Ratings from "../../pages/Product/Rating";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Topbook = () => {
  const dispatch = useDispatch();
  const { data: products, isLoading } = useGetTopProductsQuery();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, quantity: qty }));
    toast.success("Thêm vào giỏ hàng thành công");
  };

  const bgImage = {
    backgroundImage: `url(${Banner})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
  };
  return (
    <>
      <div className="pt-10 bg-dark">
        <div className="container text-center text-white">
          <div
            data-aos="flip-down"
            className="font-merienda text-3xl font-bold mb-[120px] text-slate-900"
          >
            Những cuốn sách nổi bật
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
              {products.map((product) => (
                <div
                  data-aos="zoom-in-up"
                  data-aos-delay={products.indexOf(product) * 100}
                  key={product._id}
                  className="rounded-2xl hover:text-black bg-slate-900 hover:bg-gradient-to-r from-primary to-secondary  group relative shadow-xl duration-high max-w-[300px]  h-[250px] flex justify-center items-end mb-10 sm:mb-0 hover:shadow-[0_0_40px_#007cfff0]"
                >
                  <div className="h-[200px] w-[100px] absolute -top-[100px]  ">
                    <Link
                      to={`/product/${product._id}`}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <img
                        src={product.image}
                        alt=""
                        className="h-full w-full object-cover 
                  group-hover:scale-105 rounded-xl duration-200 "
                      />
                    </Link>
                  </div>

                  <div className="p-4 text-center">
                    <div className="flex justify-center items-center  ">
                      <Ratings value={product.rating} />
                    </div>
                    <h1 className="text-xl font-bold line-clamp-1">
                      {product.name}
                    </h1>
                    <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                      {product.description}
                    </p>
                    <button
                      onClick={() => addToCartHandler(product, 1)}
                      className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div data-aos="zoom-in" className="mt-10 min-h-[550px]" style={bgImage}>
          <div className=" min-h-[550px] backdrop-blur-lg flex justify-center items-center text-white ">
            <div className="container grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="lg:mr-20 mt-8 sm:mt-0">
                <img
                  data-aos="zoom-out-right"
                  data-aos-delay="400"
                  src={BookImg}
                  alt=""
                  className="max-w-[400px] h-[350px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
                />
              </div>
              <div
                data-aos="zoom-out-left"
                data-aos-delay="400"
                className="flex flex-col justify-center gap-6 "
              >
                <h1
                  data-aos="flip-up"
                  data-aos-delay="600"
                  className="text-3xl sm:text-4xl font-bold text-center sm:text-left"
                >
                  Thư viện trong tầm tay
                </h1>
                <p
                  data-aos="flip-up"
                  data-aos-delay="800"
                  className="text-sm text-gray-400 tracking-wide leading-6"
                >
                  Chào mừng bạn đến với Thư viện Trực tuyến! Đây là nơi bạn có
                  thể khám phá và thưởng thức hàng ngàn cuốn sách từ mọi nơi
                  trên thế giới. Dù bạn ở đâu, chỉ cần có kết nối internet, bạn
                  có thể truy cập vào thư viện và khám phá thế giới tri thức một
                  cách dễ dàng và tiện lợi. Hãy cùng chúng tôi tạo nên những
                  trải nghiệm đọc sách tuyệt vời!
                </p>
                <div className="flex flex-col gap-4 mb-8 sm:mb-0">
                  <div
                    data-aos="flip-up"
                    data-aos-delay="1000"
                    className="flex items-center gap-4"
                  >
                    <GrSecure className="text-3xl h-12 w-12 bg-green-500 p-4 rounded-full" />
                    <p>Sách chất lượng</p>
                  </div>
                  <div
                    data-aos="flip-up"
                    data-aos-delay="1200"
                    className="flex items-center gap-4"
                  >
                    <GiFoodTruck className="text-3xl h-12 w-12 bg-yellow-500 p-4 rounded-full" />
                    <p>Giao hàng nhanh chóng</p>
                  </div>
                  <div
                    data-aos="flip-up"
                    data-aos-delay="1400"
                    className="flex items-center gap-4"
                  >
                    <MdOutlinePayments className="text-3xl h-12 w-12 bg-blue-500 p-4 rounded-full" />
                    <p>Phương thức thanh toán dễ dàng</p>
                  </div>
                  <div
                    data-aos="flip-up"
                    data-aos-delay="1600"
                    className="flex items-center gap-4"
                  >
                    <AiOutlineGift className="text-3xl h-12 w-12 bg-red-500 p-4 rounded-full" />
                    <p>Nhận ưu đãi trên sách</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Topbook;
