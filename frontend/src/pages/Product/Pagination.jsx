import ReactPaginate from "react-paginate";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel="Trang trước"
      pageCount={totalPages}
      onPageChange={onPageChange}
      forcePage={currentPage - 1}
      containerClassName={"flex gap-3 justify-center my-5 text-black"}
      previousClassName={`py-2 px-4 border rounded-l hover:bg-primary hover:text-white duration-300 `}
      nextClassName={`py-2 px-4 border rounded-r hover:bg-primary hover:text-white duration-300 `}
      pageClassName={
        "py-2 px-4 border rounded-md hover:bg-primary hover:text-white duration-300"
      }
      activeClassName={"text-white bg-primary rounded-md"}
      nextLabel="Trang sau"
    />
  );
};

export default Pagination;
