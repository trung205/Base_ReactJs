import React, { useEffect, useState } from "react";
import "./home.css";
import Search from "../../../components/search/search";
import Menu from "../../../components/menu/menu";
import ImdbIcon from "../../../components/imdbIcon/imdbIcon";
import CardRelease from "../../../components/cardRelease/cardRelease";
import CardComing from "../../../components/cardComing/cardComing";
import Carousel3D from "../../../components/3DCarousel/3DCarousel";
import { useDispatch, useSelector } from "react-redux";
import { loadMovies } from "../../../redux/action/index";

function Home() {
  const [classname, setClassname] = useState("end");
  const [ismenu, setIsmenu] = useState(false);
  const dataHome = useSelector((state) => state.movie.data);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const openMenu = () => {
    document.querySelector(".end").classList.toggle("menu-button");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadMovies());
  }, []);

  const Images = [
    {
      title: "title 1",
      url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Y2Fyc3xlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "title 2",
      url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    },
    {
      title: "",
      url: "https://images.unsplash.com/photo-1517672651691-24622a91b550?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1189&q=80",
    },
    {
      url: "https://images3.alphacoders.com/118/1188044.jpg",
    },
  ];
  return (
    <div className="container_1">
      <header className="header">
        <div className="start"></div>
        <div className="center">
          <Search />
        </div>
        <div className={classname}>
          <button onClick={openMenu}>
            <span className="name">Trung Hoang</span>
            <img
              className="avatar-img"
              src="https://github.com/mdo.png"
              height="32"
              width="32"
            />
          </button>
          <Menu onClickClose={openMenu}>
            <li>
              <a href="/" className="link-option">
                Tài khoản
              </a>
            </li>
            <li>
              <a href="/" className="link-option">
                Đăng xuất
              </a>
            </li>
          </Menu>
        </div>
      </header>
      <article>
        <div>
          <h2>Phim nổi bật</h2>
          <Carousel3D imageList={Images} />
        </div>
        <div class="row" id="content-top">
          <div class="col-5 top-movie-coming">
            <div className="movie-coming">
              <CardComing
                number={1}
                srcImg={
                  "https://i.pinimg.com/originals/70/f6/27/70f627687007391440db2b87a2e1c201.jpg"
                }
                href="/"
              >
                <h5>Doctor Strange 2: Multiverse of Madness</h5>
              </CardComing>
              <CardComing
                number={1}
                srcImg={
                  "https://i.pinimg.com/originals/70/f6/27/70f627687007391440db2b87a2e1c201.jpg"
                }
                href="/"
              >
                <h5>Doctor Strange 2: Multiverse of Madness</h5>
              </CardComing>
              <CardComing
                number={1}
                srcImg={
                  "https://i.pinimg.com/originals/70/f6/27/70f627687007391440db2b87a2e1c201.jpg"
                }
                href="/"
              >
                <h5>Doctor Strange 2: Multiverse of Madness</h5>
              </CardComing>
              <CardComing
                number={1}
                srcImg={
                  "https://i.pinimg.com/originals/70/f6/27/70f627687007391440db2b87a2e1c201.jpg"
                }
                href="/"
              >
                <h5>Doctor Strange 2: Multiverse of Madness</h5>
              </CardComing>
            </div>
          </div>
          <div class="movie-release col-7">
            <div>
              {dataHome?.data?.item?.map((movie) => (
                <CardRelease
                  srcImg={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                >
                  <h2>{movie?.original_title}</h2>
                  <p>{movie?.title}</p>
                  <p>1 giờ 45 phút</p>
                  <ImdbIcon />
                  <p className="text-description">{movie?.overview}</p>
                </CardRelease>
              ))}
            </div>
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1">
                    Previous
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    1
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    2
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    3
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Home;
