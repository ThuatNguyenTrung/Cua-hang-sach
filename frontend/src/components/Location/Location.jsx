const Location = () => {
  return (
    <div data-aos="zoom-in" className="pb-10">
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-semibold ml-10"
      >
        Vị trí của cửa hàng
      </div>
      <div data-aos="fade-up" data-aos-delay="500" className="rounded-xl ml-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.41842091794!2d106.36554998959085!3d10.75529287746115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1709985821719!5m2!1svi!2s"
          width="100%"
          height="360 "
          style={{ borderRadius: "20px" }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};
export default Location;
