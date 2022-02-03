import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./Owl.css";
import IMG1 from "../../assets/img/img1.jpg";

function carousel(props) {
  const { children } = props;
  return (
    <div>
      <div class="container-fluid">
        <OwlCarousel items={3} className="owl-theme" loop nav margin={8} autoplay={false} autoplayTimeout={5000}>
          {/* <div>
            <img className="img" src={IMG1} />
          </div> */}
          {children}
        </OwlCarousel>
      </div>
    </div>
  );
}

export default carousel;
