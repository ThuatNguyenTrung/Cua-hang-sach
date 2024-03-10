import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApiSlice";
import Loader from "../../components/Loader/Loader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PoupCategory from "../../components/Popup/PoupCategory";

const CategoryList = () => {
  const [name, setName] = useState("");
  const { data: categories, isLoading, refetch } = useGetAllCategoriesQuery();

  const [createCategory, { isLoading: loadingCreate }] =
    useCreateCategoryMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createCategoryHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createCategory({ name }).unwrap();
      toast.success(res.message);
      setName("");
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  const [openPopup, setOpenPopup] = useState(false);
  const [deleteCategory] = useDeleteCategoryMutation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedname, setUpdatedName] = useState("");

  const handleDelete = async () => {
    try {
      if (!window.confirm("Bạn có muốn xóa danh mục này ?")) {
        return;
      }
      const res = await deleteCategory(selectedCategory._id).unwrap();

      setOpenPopup(false);
      setSelectedCategory(null);
      refetch();
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  const [updateCategory] = useUpdateCategoryMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateCategory({
        id: selectedCategory._id,
        name: updatedname,
      }).unwrap();
      toast.success(res.message);
      setSelectedCategory(null);
      setOpenPopup(false);
      setUpdatedName("");
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-10 bg-dark min-h-[750px] flex justify-center items-center">
          <div className="container text-white bg-slate-900 p-5 rounded-xl">
            <h1 className="text-2xl font-semibold mb-5 text-center">
              Danh sách các danh mục ({categories?.length})
            </h1>
            <div>
              <form onSubmit={createCategoryHandler}>
                <label className="input-label">Thêm danh mục</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Nhập tên danh mục"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button
                  className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 transition-all rounded-full px-4 py-1 mt-3"
                  disabled={loadingCreate}
                  type="submit"
                >
                  Thêm
                </button>
                {loadingCreate && <Loader />}
              </form>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories?.map((category) => (
                <div key={category._id}>
                  <button
                    className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 transition-all rounded-full w-[250px] py-1 mt-3"
                    onClick={() => {
                      setOpenPopup(true);
                      setSelectedCategory(category);
                      setUpdatedName(category.name);
                    }}
                  >
                    {category.name}
                  </button>
                </div>
              ))}
            </div>
            <PoupCategory
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              value={updatedname}
              setValue={(value) => setUpdatedName(value)}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default CategoryList;
