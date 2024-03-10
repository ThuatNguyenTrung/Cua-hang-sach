import moment from "moment";
import Ratings from "./Rating";

const Review = ({
  product,
  userInfo,
  valueRating,
  setValueRating,
  valueComment,
  setValueComment,
  reviewHandler,
}) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay="1300"
      className="text-white mt-10 bg-slate-800 rounded-xl p-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h1 className="text-xl font-semibold">Đánh giá của bạn</h1>
          <div>
            {!userInfo ? (
              <p>Vui lòng đăng nhập để đánh giá</p>
            ) : (
              <div>
                <form className="space-y-3" onSubmit={reviewHandler}>
                  <div>
                    <label htmlFor="rating" className="input-label">
                      Đánh giá
                    </label>
                    <select
                      name="rating"
                      id="rating"
                      className="input"
                      value={valueRating}
                      onChange={(e) => setValueRating(e.target.value)}
                    >
                      <option value="">Chọn đánh giá</option>
                      <option value="1">Rất Kém</option>
                      <option value="2">Kém</option>
                      <option value="3">Trung Bình</option>
                      <option value="4">Tốt </option>
                      <option value="5">Xuất Sắc</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="comment" className="input-label">
                      Nội dung
                    </label>
                    <textarea
                      name="comment"
                      id="comment"
                      cols="30"
                      rows="3"
                      className="w-full border border-slate-400 rounded-lg p-2 text-black"
                      value={valueComment}
                      onChange={(e) => setValueComment(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    className="bg-primary text-white px-5 py-1 rounded-full hover:bg-yellow-500 hover:scale-105 duration-200 transition-all"
                    type="submit"
                  >
                    Đánh giá
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        <div>
          {product.reviews.length === 0 ? (
            <p className="text-yellow-500 text-center font-semibold  sm:mt-20">
              Chưa có đánh giá
            </p>
          ) : (
            <div className="sm:mt-10 space-y-3">
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-slate-900 p-5 rounded-lg space-y-2"
                >
                  <div className="flex justify-between">
                    <p>{review.name}</p>
                    <p>{moment(review.createdAt).fromNow()}</p>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Review;
