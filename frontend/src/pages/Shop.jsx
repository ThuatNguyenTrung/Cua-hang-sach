import { useEffect, useState } from "react";

import { useGetAllCategoriesQuery } from "../redux/api/categoryApiSlice";
import unidecode from "unidecode";

import Loader from "./../components/Loader/Loader";
import { useGetAllProductsQuery } from "../redux/api/productApiSlice";
import { IoMdSearch } from "react-icons/io";
import ProductCard from "./Product/ProductCard";
import Pagination from "./Product/Pagination";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const { data: categories, isLoading: isLoadingCategories } =
    useGetAllCategoriesQuery();

  const [dataProducts, setDataProducts] = useState([]);
  const { data: allProducts, isLoading: isLoadingProducts } =
    useGetAllProductsQuery();

  useEffect(() => {
    if (allProducts && !isLoadingProducts) {
      setDataProducts(allProducts);
    }
  }, [allProducts, isLoadingProducts]);

  const handleChangeCategory = (value, id) => {
    const newChecked = value
      ? [...selectedCategory, id]
      : selectedCategory.filter((item) => item !== id);
    setSelectedCategory(newChecked);
    toggleMenu();
  };

  const productsFilter = dataProducts.filter((product) => {
    if (selectedCategory.length === 0) {
      return true;
    }
    return selectedCategory.includes(product.category);
  });

  const handleChangePrice = (e) => {
    const prices = e.target.value;
    let minRange = prices.split("-")[0];
    let maxRange = prices.split("-")[1];
    if (maxRange === "greater") {
      maxRange = Infinity;
    }
    const products = allProducts.filter((product) => {
      return product.price >= minRange && product.price <= maxRange;
    });
    setDataProducts(products);
    toggleMenu();
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchTerm = (e) => {
    const search = unidecode(e.target.value.toLowerCase());
    setSearchTerm(search);

    const filteredProducts = allProducts.filter((product) => {
      const productName = unidecode(product.name.toLowerCase());
      return productName.includes(search);
    });

    setDataProducts(filteredProducts);
  };

  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handlePageChange = (e) => {
    setCurrentPage(e.selected + 1);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const totalPages = Math.ceil(dataProducts.length / productsPerPage);

  const currentProducts = productsFilter.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (isLoadingProducts) {
    return <Loader />;
  }
  if (isLoadingCategories) {
    return <Loader />;
  }

  return (
    <>
      <div className="pt-20 bg-dark min-h-screen">
        <div className="container text-white">
          <div className="flex flex-wrap gap-[2%]">
            {/* Lọc */}
            {/* Desktop */}
            <div
              data-aos="flip-right"
              className="hidden lg:block w-[19%] bg-slate-900 rounded-lg h-[630px] mt-[60px]"
            >
              {/* Danh mục */}
              <div className="p-3 space-y-3">
                <h1 className="text-xl text-center bg-primary text-yellow-200 rounded-full">
                  Thể loại
                </h1>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <div
                      key={category._id}
                      className="hover:bg-yellow-200 hover:text-black rounded-lg cursor-pointer p-1 duration-300"
                    >
                      <input
                        type="checkbox"
                        id={category.name}
                        className=""
                        onChange={(e) =>
                          handleChangeCategory(e.target.checked, category._id)
                        }
                      />
                      <label className="text-sm ml-2" htmlFor={category.name}>
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* Giá */}
              <div className="p-3 space-y-3">
                <h1 className="text-xl text-center bg-primary text-yellow-200 rounded-full">
                  Giá
                </h1>
                <div>
                  <select
                    name="price"
                    className="input"
                    onChange={handleChangePrice}
                  >
                    <option value="0-greater">Tât cả</option>
                    <option value="0-100000">Từ 0 đến 100k</option>
                    <option value="100000-200000">Từ 100k đến 200k</option>
                    <option value="200000-300000"> Từ 200k đến 300k</option>
                    <option value="300000-400000"> Từ 300k đến 400k</option>
                    <option value="400000-greater"> Từ 400k trở lên</option>
                  </select>
                </div>
              </div>
              {/* Làm mới */}
              <div className="p-3 ">
                <button
                  className="bg-black text-white rounded-full w-full py-1 hover:bg-yellow-300 hover:text-black duration-300"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Làm mới
                </button>
              </div>
            </div>
            {/* Mobile */}
            <div
              className={`${
                openMenu ? "left-0" : "-left-[9999px]"
              } absolute top-[63px] w-[70%] z-10 bg-black duration-300 ease-in-out lg:hidden `}
            >
              <div className="p-3 space-y-3">
                <h1 className="text-xl text-center bg-primary text-yellow-200 rounded-full">
                  Thể loại
                </h1>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <div
                      key={category._id}
                      className="hover:bg-yellow-200 hover:text-black rounded-lg cursor-pointer p-1 duration-300"
                    >
                      <input
                        type="checkbox"
                        id={category.name}
                        className=""
                        onChange={(e) =>
                          handleChangeCategory(e.target.checked, category._id)
                        }
                      />
                      <label className="text-sm ml-2" htmlFor={category.name}>
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* Giá */}
              <div className="p-3 space-y-3">
                <h1 className="text-xl text-center bg-primary text-yellow-200 rounded-full">
                  Giá
                </h1>
                <div>
                  <select
                    name="price"
                    className="input"
                    onChange={handleChangePrice}
                  >
                    <option value="0-greater">Tât cả</option>
                    <option value="0-100000">Từ 0 đến 100k</option>
                    <option value="100000-200000">Từ 100k đến 200k</option>
                    <option value="200000-300000"> Từ 200k đến 300k</option>
                    <option value="300000-400000"> Từ 300k đến 400k</option>
                    <option value="400000-greater"> Từ 400k trở lên</option>
                  </select>
                </div>
              </div>
              {/* Làm mới */}
              <div className="p-3 ">
                <button
                  className="bg-yellow-800 text-white rounded-full w-full py-1 hover:bg-yellow-300 hover:text-black duration-300"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Làm mới
                </button>
              </div>
            </div>

            {/* sản phẩm */}
            <div className="lg:w-[79%] w-full">
              <div
                data-aos="fade-up"
                className="p-3 text-black flex justify-between"
              >
                <h1 className="text-2xl font-semibold ">Sản phẩm</h1>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm"
                    className="w-[130px] sm:w-[200px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary "
                    value={searchTerm}
                    onChange={handleSearchTerm}
                  />
                  <IoMdSearch className="text-gray-500 hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
                </div>
                <div className="lg:hidden">
                  <button
                    className="bg-black text-white rounded-full px-3 py-1 hover:bg-yellow-300 hover:text-black duration-300"
                    onClick={toggleMenu}
                  >
                    Bộ lọc
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentProducts.map((product) => (
                  <div
                    data-aos="zoom-in"
                    data-aos-delay={currentProducts.indexOf(product) * 200}
                    key={product._id}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              {/* Phân trang */}
              <Pagination
                totalPages={totalPages > 0 ? totalPages : 1}
                currentPage={currentPage > 0 ? currentPage : 1}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Shop;
