import ProductCard from "./ProductCard";
const RelativeProduct = ({ productRelative }) => {
  return (
    <div
      data-aos="fade-up"
      className="mt-10 bg-slate-400 rounded-xl p-5 space-y-3"
    >
      <h1
        data-aos="flip-down"
        data-aos-delay="300"
        className="text-2xl font-semibold text-center"
      >
        Những quyển sách liên quan
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {productRelative.map((product) => (
          <div
            data-aos="zoom-in"
            data-aos-delay={productRelative.indexOf(product) * 100}
            key={product._id}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default RelativeProduct;
