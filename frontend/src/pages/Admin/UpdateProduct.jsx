import { useEffect, useState } from "react";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice";
import {
  useUploadImageMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../redux/api/productApiSlice";
import { toast } from "react-toastify";
import Loader from "./../../components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const { data: product, refetch } = useGetProductByIdQuery(id);

  const { data: categories, isLoading } = useGetAllCategoriesQuery();
  const [uploadImage] = useUploadImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setAuthor(product.author);
      setImageUrl(product.image);
    }
  }, [product]);

  const uploadHandler = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      const res = await uploadImage(formData).unwrap();
      console.log(res);
      toast.success(res.message);
      setImageUrl(res.image);
      setImage(res.image);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message) || error(error.message);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        id,
        name,
        price,
        description,
        category,
        countInStock,
        author,
        image,
      };
      const res = await updateProduct(data).unwrap();
      toast.success(res.message);
      navigate("/admin/allproductlist");
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message) || error(error.message);
    }
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      if (!window.confirm("Bạn có chắc muốn xóa sách này?")) {
        return;
      }
      const res = await deleteProduct(id).unwrap();
      toast.success(res.message);
      navigate("/admin/allproductlist");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message) || error(error.message);
    }
  };

  return (
    <>
      <div className="mt-10 min-h-screen bg-dark flex justify-center items-center">
        <div className="container bg-slate-900 p-5 rounded-xl text-white space-y-5">
          <div className="text-2xl font-semibold text-center">Tải sách</div>
          {imageUrl && (
            <div>
              <img src={imageUrl} alt="" className="w-40 h-40 mx-auto " />
            </div>
          )}

          <div className="flex justify-center items-center text-center">
            <label className="border-2 block cursor-pointer rounded-full w-full py-6 bg-slate-700 ">
              <p>{image ? image.name : "Tải hình ảnh "}</p>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={uploadHandler}
              />
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 ">
            <div>
              <label
                htmlFor="name"
                className="input-label font-semibold cursor-pointer"
              >
                {" "}
                Tên sách
              </label>
              <input
                type="text"
                id="name"
                className="input"
                placeholder="Nhập tên sách..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="input-label font-semibold cursor-pointer"
              >
                {" "}
                Giá tiền
              </label>
              <input
                type="number"
                id="price"
                className="input"
                placeholder="Nhập giá tiền..."
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="author"
                className="input-label font-semibold cursor-pointer"
              >
                {" "}
                Tác giả
              </label>
              <input
                type="text"
                id="author"
                className="input"
                placeholder="Nhập tác giả..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="stock"
                className="input-label font-semibold cursor-pointer"
              >
                {" "}
                Số lượng trong kho
              </label>
              <input
                type="number"
                id="stock"
                className="input"
                placeholder="Nhập số lượng trong kho..."
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <div>
                <label
                  htmlFor="category"
                  className="input-label font-semibold cursor-pointer"
                >
                  {" "}
                  Danh mục
                </label>
                <select
                  name="category"
                  id="category"
                  className="input"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Chọn danh mục</option>
                  {categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="w-[90%] mx-auto ">
            <label
              htmlFor="description"
              className="input-label font-semibold cursor-pointer"
            >
              Mô tả sách
            </label>
            <textarea
              name="description"
              id=" description"
              cols="30"
              rows="2"
              className="w-full text-black border border-gray-300 focus:outline-none focus:border-primary rounded-lg px-4 py-2 bg-slate-200"
              placeholder="Nhập mô tả..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-around">
            <button
              className="w-[150px] bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-l text-white px-4 py-2 rounded-full hover:scale-110 duration-200 transition-all"
              onClick={updateHandler}
            >
              Cập nhật
            </button>
            <button
              className="w-[150px] bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-l text-white px-4 py-2 rounded-full hover:scale-110 duration-200 transition-all"
              onClick={deleteHandler}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpdateProduct;
