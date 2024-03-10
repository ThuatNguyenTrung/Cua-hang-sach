import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useCreateReviewMutation,
  useGetProductByIdQuery,
  useGetRelativeProductsQuery,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader/Loader";
import formatPriceToVND from "./../../Utils/fomatPrice";
import { LiaUserEditSolid } from "react-icons/lia";
import moment from "moment";
import { FaBox, FaStar } from "react-icons/fa";
import Ratings from "./Rating";
import Review from "./Review";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import RelativeProduct from "./RelativeProduct";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: product, isLoading, refetch } = useGetProductByIdQuery(id);
  useEffect(() => {
    refetch();
  }, [refetch]);
  const [qty, setQty] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewProduct] = useCreateReviewMutation();
  const { data: productRelative, isLoading: isLoadingRelative } =
    useGetRelativeProductsQuery(id);

  if (isLoadingRelative) {
    return <Loader />;
  }

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const reviewHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        rating,
        comment,
        id: product._id,
      };
      const res = await reviewProduct(data);

      toast.success(res.data.message);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error("Bạn đã đánh giá sách này");
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity: qty }));
    toast.success("Thêm vào giỏ hàng thành công");
  };

  return (
    <>
      <div className="bg-dark pt-20 pb-10 min-h-screen">
        <div className="container bg-slate-900 p-5 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div className="flex justify-center items-center">
              <div
                data-aos="fade-right"
                className="h-[300px] w-[200px] bg-slate-100 rounded-md p-3 overflow-hidden "
              >
                <img
                  src={product.image}
                  alt="product"
                  className="w-full h-full object-cover rounded-md hover:scale-105 duration-200 hover:skew-x-3"
                />
              </div>
            </div>
            <div
              data-aos="fade-up"
              className="col-span-2 text-center text-white space-y-3"
            >
              <h1
                data-aos="flip-down"
                data-aos-delay="300"
                className="text-3xl font-semibold"
              >
                {product.name}
              </h1>
              <div data-aos="flip-down" data-aos-delay="600">
                <p
                  className={`text-sm opacity-60 text-left ${
                    expanded ? "" : "line-clamp-3"
                  }`}
                >
                  {product.description}
                </p>
                <button
                  onClick={toggleExpanded}
                  className="text-primary hover:underline"
                >
                  {expanded ? "Thu gọn" : "Xem thêm"}
                </button>
              </div>
              <p
                data-aos="flip-down"
                data-aos-delay="900"
                className="text-2xl font-bold text-yellow-400"
              >
                Giá: {formatPriceToVND(product.price)}
              </p>
              <div
                data-aos="flip-down"
                data-aos-delay="1200"
                className="grid grid-cols-2 items-center"
              >
                <div className="space-y-4">
                  <div className="flex gap-2 items-center ">
                    <LiaUserEditSolid className="h-8 w-8 bg-red-500 rounded-full p-2 " />
                    <p className="text-sm opacity-60">Tác giả:</p>
                    <p className="">{product.author}</p>
                  </div>
                  <div className="flex gap-2 items-center ">
                    <LiaUserEditSolid className="h-8 w-8 bg-blue-500 rounded-full p-2 " />
                    <p className="text-sm opacity-60">Nhập:</p>
                    <p className="">{moment(product.createdAt).fromNow()}</p>
                  </div>

                  <div className="flex gap-2 items-center ">
                    <Ratings value={product.rating} />
                    <p className="">{product.numReviews} Đánh giá</p>
                  </div>
                </div>
                <div className="space-y-4 mx-auto">
                  <div className="flex gap-2 items-center ">
                    <FaStar className="h-8 w-8 bg-yellow-500 rounded-full p-2 " />
                    <p className="text-sm opacity-60">Rating:</p>
                    <p className="">{product.rating}</p>
                  </div>
                  <div className="flex gap-2 items-center ">
                    <FaBox className="h-8 w-8 bg-green-500 rounded-full p-2 " />
                    <p className="text-sm opacity-60">Kho:</p>
                    <p className="">{product.countInStock}</p>
                  </div>
                  <div className="text-left">
                    {product.countInStock > 0 && (
                      <select
                        className="w-[100px] input"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" className="flex justify-center mt-5">
            <button
              className="bg-primary text-white px-5 py-2 rounded-full hover:bg-yellow-500 hover:scale-105 duration-200 transition-all"
              onClick={addToCartHandler}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
          <Review
            product={product}
            userInfo={userInfo}
            valueRating={rating}
            setValueRating={(valueRating) => setRating(valueRating)}
            valueComment={comment}
            setValueComment={(valueComment) => setComment(valueComment)}
            reviewHandler={reviewHandler}
          />
          <RelativeProduct productRelative={productRelative} />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
