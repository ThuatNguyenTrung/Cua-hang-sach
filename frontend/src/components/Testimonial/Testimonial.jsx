import { useGetRandomReviewsQuery } from "../../redux/api/productApiSlice";
import Loader from "../Loader/Loader";
import Slider from "react-slick";
import img from "../../../../uploads/images/dandelion-445228_1280.jpg";
import { Link } from "react-router-dom";

const Testimonial = () => {
  const { data: products, isLoading } = useGetRandomReviewsQuery();

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const bgImgage = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div data-aos="zoom-in" className="" style={bgImgage}>
      <div className="pt-5 bg-black/20 backdrop-blur space-y-5">
        <div
          data-aos="fade-up"
          className="font-merienda text-3xl text-center font-bold text-black"
        >
          Nhận xét từ khách hàng
        </div>
        <div className="container mx-auto pb-10">
          <Slider {...settings}>
            {products?.map((product) => (
              <div data-aos="zoom-in" key={product._id}>
                <div className="grid grid-cols-3 h-52 items-center gap-4 text-center shadow-lg mx-4 p-4 bg-white/50 rounded-2xl relative">
                  <div className="w-28 h-40 bg-slate-900 left-2 rounded-lg p-2">
                    <Link
                      to={`/product/${product._id}`}
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    >
                      <img
                        src={product.image}
                        alt=""
                        className="w-full h-full hover:scale-105 duration-300 rounded-lg object-cover"
                      />
                    </Link>
                  </div>
                  <div className="col-span-2 flex flex-col items-center ">
                    <h1 className="text-2xl font-merienda bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary capitalize absolute top-2 left-1/2">
                      {product.reviews[0].name}
                    </h1>
                    <p className="text-sm text-left">
                      {product.reviews[0].comment}
                    </p>
                  </div>

                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                    {" "}
                    ,,
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
export default Testimonial;
