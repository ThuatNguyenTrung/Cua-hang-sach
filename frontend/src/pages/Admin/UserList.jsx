import { useEffect } from "react";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../redux/api/userApiSlice";
import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";

const UserList = () => {
  const { data: users, isLoading, refetch } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Bạn có muốn xóa người dùng này ?")) {
        return;
      }
      const res = await deleteUser(id).unwrap();
      toast.success(res.message);
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
        <div className="pt-20 bg-dark min-h-[750px] flex items-center justify-center">
          <div className="container  text-white bg-slate-900 rounded-xl p-5">
            <h1 className="text-2xl font-semibold mb-5">
              Danh sách người dùng ({users?.length}){" "}
            </h1>
            <div>
              <table className="w-full border-2 bg-slate-800">
                <thead className="bg-primary">
                  <tr>
                    <td className="hidden md:block">Id</td>
                    <td>Tên</td>
                    <td>Email</td>
                    <td>Admin</td>
                    <td>Xóa</td>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
                    <tr
                      key={user._id}
                      className="border-2 hover:bg-yellow-500 duration-200 transition-all"
                    >
                      <td className="hidden md:block">{user._id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.isAdmin ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaTimes className="text-red-500" />
                        )}
                      </td>
                      <td>
                        {" "}
                        {user.isAdmin ? (
                          ""
                        ) : (
                          <button
                            onClick={() => handleDelete(user._id)}
                            disabled={loadingDelete}
                          >
                            <FaTrash className="text-red-500 hover:text-red-800 duration-200 transition-all hover:scale-110" />
                          </button>
                        )}{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default UserList;
