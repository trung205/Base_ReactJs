import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./Owl.css";
import IMG1 from "../../assets/img/img1.jpg";

function Carousel(props) {
  const { children, navClass, navContainerClass, data, slideBy } = props;
  useEffect(() => {}, [data]);
  return (
    <div>
      <div class="container-fluid">
        <OwlCarousel
          items={5}
          margin={8}
          autoplay={false}
          nav
          navClass={navClass}
          navContainerClass={navContainerClass}
          slideBy={slideBy}
        >
          {/* <div>
            <img className="img" src={IMG1} />
          </div> */}
          {children}
        </OwlCarousel>
      </div>
    </div>
  );
}

export default Carousel;
