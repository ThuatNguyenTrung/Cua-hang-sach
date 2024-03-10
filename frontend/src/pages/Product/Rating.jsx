import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value }) => {
  const fullStarts = Math.floor(value);
  const halfStars = Math.round(value - fullStarts);
  const emptyStars = 5 - fullStarts - halfStars;
  return (
    <div className="flex gap-1">
      {[...Array(fullStarts)].map((_, index) => (
        <FaStar key={index} className="text-yellow-500" />
      ))}
      {halfStars > 0 && <FaStarHalfAlt className="text-yellow-500" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} className="text-yellow-500" />
      ))}
    </div>
  );
};

export default Ratings;
