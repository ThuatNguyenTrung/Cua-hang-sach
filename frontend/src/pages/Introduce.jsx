import bgImage from "../../../uploads/images/benches-560435_1280.jpg";
import Location from "../components/Location/Location";
const Introduce = () => {
  const bgImgage = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
  };
  return (
    <>
      <div className="min-h-screen" style={bgImgage}>
        <div className="min-h-screen bg-black/50 backdrop-blur">
          <div className="container pt-20 text-white ">
            <div>
              <h1
                data-aos="fade-up"
                className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold"
              >
                Về chúng tôi
              </h1>
              <p data-aos="fade-up" data-aos-delay="300">
                Chào mừng quý khách đến với{" "}
                <strong className="text-primary">TBook</strong> - điểm đến lý
                tưởng cho những đam mê văn chương và tri thức! Tại đây, chúng
                tôi tự hào là địa chỉ uy tín cung cấp sách phong phú, đa dạng về
                thể loại và độ chất lượng cao, đáp ứng đa dạng nhu cầu đọc sách
                của khách hàng.
              </p>
              <br />
              <p data-aos="fade-up" data-aos-delay="500">
                <strong className="text-primary">TBook</strong> không chỉ là một
                cửa hàng bán sách mà còn là không gian của sự tìm kiếm, sáng tạo
                và đổi mới. Với mục tiêu mang lại trải nghiệm mua sắm sách tuyệt
                vời nhất, chúng tôi luôn nỗ lực để cập nhật những tựa sách mới
                nhất, từ những tác phẩm kinh điển cho đến những xu hướng văn hóa
                hiện đại.
              </p>
              <br />
              <p data-aos="fade-up" data-aos-delay="700">
                Sự đa dạng không chỉ xuất phát từ danh mục sách mà còn từ sự
                chân thành và đam mê của đội ngũ nhân viên TBook. Chúng tôi
                không chỉ là những người bán sách, mà còn là những người yêu
                sách, luôn sẵn sàng chia sẻ kiến thức và tư vấn để bạn có thể
                tìm thấy những cuốn sách phản ánh đúng mong muốn và sở thích của
                mình. Không chỉ là nơi mua sắm,{" "}
                <strong className="text-primary">TBook</strong> còn là điểm hội
                tụ của cộng đồng yêu sách.
              </p>
              <br />
              <p data-aos="fade-up" data-aos-delay="900">
                Chúng tôi thường xuyên tổ chức các sự kiện, hội thảo với sự tham
                gia của các tác giả nổi tiếng và những buổi ký tặng sách để tạo
                ra môi trường giao lưu, chia sẻ và trải nghiệm văn hóa độc đáo.
                Hãy đến với <strong className="text-primary">TBook</strong>, nơi
                mà tri thức và niềm đam mê sách hòa mình trong không gian ấm áp
                và tận hưởng một trải nghiệm mua sắm sách khác biệt!
              </p>
            </div>
            <Location />
          </div>
        </div>
      </div>
    </>
  );
};
export default Introduce;
