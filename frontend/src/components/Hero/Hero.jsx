import Heroimg from "../../../../uploads/images/pexels-stanislav-kondratiev-2908984.jpg";
import { useEffect, useState } from "react";
import { useGetRandomProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "./../Loader/Loader";
import { Link } from "react-router-dom";

const Hero = () => {
  const { data: products, isLoading } = useGetRandomProductsQuery();

  useEffect(() => {
    if (products && products.length > 0) {
      setImageIndex(products[0].image);
      setName(products[0].name);
      setDescription(products[0].description);
      setAuthor(products[0].author);
      setId(products[0]._id);
    }
  }, [products]);

  const [imageIndex, setImageIndex] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [id, setId] = useState("");

  const bgImgage = {
    backgroundImage: `url(${Heroimg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
  };
  return (
    <>
      <div className=" min-h-[550px] sm:min-h-[700px]" style={bgImgage}>
        <div className="min-h-[550px] sm:min-h-[700px] bg-black/20 backdrop-blur flex justify-center items-center">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="container text-white pb-8 sm:pb-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nội dung */}
                <div className="flex flex-col justify-center gap-4 text-center sm:text-left order-2 sm:order-1">
                  <h1
                    data-aos="fade-up"
                    className="font-merienda text-4xl sm:text-5xl lg:text-6xl font-bold"
                  >
                    {name}
                    <p className="bg-clip-text text-transparent bg-gradient-to-b from-primary to-secondary sm:text-right text-sm">
                      {author}{" "}
                    </p>
                  </h1>
                  <p
                    data-aos="fade-up"
                    data-aos-delay="300"
                    className="text-sm line-clamp-3"
                  >
                    {description}
                  </p>
                  <div data-aos="fade-up" data-aos-delay="500">
                    <Link
                      to={`/product/${id}`}
                      onClick={() => window.scrollTo(0, 0)}
                      className="bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full hover:scale-105 duration-200"
                    >
                      Xem thêm
                    </Link>
                  </div>
                </div>
                {/* Hình ảnh  */}
                <div className="mb-10 sm:mb-0 relative min-h-[450px]  order-1 sm:order-2 flex justify-center items-center">
                  <div
                    data-aos="zoom-in"
                    className="h-[300px] sm:h-[400px] w-[200px] sm:w-[280px] overflow-hidden flex justify-center items-center"
                  >
                    <img
                      src={imageIndex}
                      alt=""
                      className="h-full w-full object-cover mx-auto"
                    />
                  </div>
                  <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 justify-center gap-4 absolute -bottom-[40px] lg:-right-2  ">
                    {products.map((product) => (
                      <div
                        data-aos="fade-up"
                        data-aos-delay={products.indexOf(product) * 200}
                        key={product._id}
                        className="min-h-[100px] w-[70px] "
                      >
                        <img
                          src={product.image}
                          alt=""
                          className="h-full w-full object-cover cursor-pointer hover:scale-125 duration-200"
                          onClick={() => {
                            setImageIndex(product.image);
                            setName(product.name);
                            setDescription(product.description);
                            setAuthor(product.author);
                            setId(product._id);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Hero;
