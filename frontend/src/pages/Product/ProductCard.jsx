import formatPriceToVND from "../../Utils/fomatPrice";
import Ratings from "./Rating";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const addToCartHandler = (p, qty) => {
    dispatch(addToCart({ ...p, quantity: qty }));
    toast.success("Thêm vào giỏ hàng thành công");
  };

  return (
    <div className="text-white space-y-2 bg-slate-900 w-full rounded-lg h-[310px] p-3 hover:text-white group relative shadow-xl duration-high">
      <Link
        to={`/product/${product._id}`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <div className="h-[150px] w-[100px] bg-slate-100 rounded-md p-2 mx-auto group-hover:scale-105 duration-200 mb-3">
          <img
            src={product.image}
            alt="product"
            className="h-full w-full object-cover rounded-md "
          />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold line-clamp-1">{product.name}</h1>
          <p className="text-xs line-clamp-2 opacity-60">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-sm ">{product.author}</p>
            <p className="text-xl font-bold text-yellow-400">
              {formatPriceToVND(product.price)}
            </p>
          </div>
          <div className="flex justify-between items-center  ">
            <Ratings value={product.rating} />
            <p className="">{product.numReviews} Đánh giá</p>
          </div>
        </div>
      </Link>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:flex">
        <button
          className="flex items-center justify-center gap-2 bg-primary hover:bg-yellow-500 hover:scale-105 w-[150px] duration-200 transition-all text-white p-2 rounded-full"
          onClick={() => addToCartHandler(product, 1)}
        >
          <p>Thêm vào giỏ</p> <IoCartOutline />
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
