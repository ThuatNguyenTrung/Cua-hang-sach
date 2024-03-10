import { IoCloseOutline } from "react-icons/io5";

const PoupCategory = ({
  openPopup,
  setOpenPopup,
  handleDelete,
  value,
  setValue,
  handleUpdate,
}) => {
  return (
    <>
      {openPopup && (
        <div className="fixed top-0 left-0 bg-black/50 h-full w-full backdrop-blur-sm flex justify-center items-center">
          <div className="bg-slate-900 p-5 rounded-2xl w-[400px] space-y-3">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Danh mục</h1>
              <IoCloseOutline
                className="text-3xl cursor-pointer hover:text-primary  duration-200 transition-all block"
                onClick={() => setOpenPopup(false)}
              />
            </div>
            <form onSubmit={handleUpdate}>
              <label className="input-label">Tên danh mục</label>
              <input
                type="text"
                className="input"
                placeholder="Nhập tên danh mục"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <div className="flex justify-between">
                <button
                  className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 transition-all rounded-full px-4 py-1 mt-3 w-[100px]"
                  type="submit"
                >
                  Cập nhật
                </button>
                <button
                  className="bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 duration-200 transition-all rounded-full px-4 py-1 mt-3 w-[100px]"
                  onClick={handleDelete}
                  type="button"
                >
                  Xóa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default PoupCategory;
