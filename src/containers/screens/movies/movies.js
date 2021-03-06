import React, { useEffect, useState, useMemo, useRef } from "react";
import "./movies.css";
import { useDispatch, useSelector } from "react-redux";
import ImdbIcon from "../../../components/imdbIcon/imdbIcon";
import Carousel from "../../../components/carousel/carousel";
import StarRating from "../../../components/starRating/starRating";
import Header from "../../../components/header/header";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../components/modal/modal";
import { useParams } from "react-router-dom";
import {
  loadListActor,
  loadMoviesDetail,
  loadPost,
} from "../../../redux/action/index";
import { useNavigate } from "react-router-dom";
import { requestCreatePost, requestPost } from "../../../common/axios";
import Pagination from "../../../components/panigation/panigation_real";
import * as moment from "moment";
import { animateScroll as scroll, Element, scroller } from "react-scroll";

function Movies(props) {
  let params = useParams(); //568124
  let navigate = useNavigate();
  const dataListActor = useSelector((state) => state.listActor);
  const dataMovieDetail = useSelector((state) => state.movieDetail);
  const dataPost = useSelector((state) => state.post);
  const postData = { ...dataPost?.data };
  let listerRef = useRef();

  const [showModal, setShowModal] = useState(false);
  const [listPost, setListPost] = useState(null);
  const [post, setPost] = useState({
    fields: {
      userId: 1,
      movieId: params.id,
      content: null,
      point: null,
    },
    errors: {},
    loading: false,
  });

  const [state, setState] = useState({
    allCountries: [],
    currentCountries: [],
    currentPage: 1,
    totalPages: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadListActor(params.id));
  }, [params]);

  useEffect(() => {
    dispatch(loadMoviesDetail(params.id));
  }, [params]);

  useEffect(() => {
    console.log(state.currentPage, "page");
    dispatch(loadPost(params.id, state.currentPage));
  }, [state]);

  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  const handleValidation = () => {
    let fields = post.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["content"]) {
      formIsValid = false;
      errors["content"] = "kh??ng ???????c ????? tr???ng";
    }

    if (!fields["point"]) {
      formIsValid = false;
      errors["point"] = "b???n ph???i cho ??i???m";
    }

    setPost({
      ...post,
      errors: errors,
    });
    return formIsValid;
  };

  const handleChange = (e) => {
    setPost({
      ...post,
      fields: { ...post.fields, content: e.target.value },
      errors: {},
    });
  };

  const handlePost = async () => {
    try {
      if (handleValidation()) {
        setPost({ ...post, loading: true });
        let res = await requestCreatePost(post.fields);
        setPost({ ...post, loading: false });
        setShowModal(false);
        postData?.items?.unshift(post.fields);
      } else {
      }
    } catch (error) {
      console.log("c?? l???i x???y ra", error);
    }
  };

  const onPageChanged = (data) => {
    const { allCountries } = state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentCountries = allCountries.slice(offset, offset + pageLimit);

    setState({ ...state, currentPage, currentCountries, totalPages });
    scroller.scrollTo("scroll-to-element", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const Carouselrender = useMemo(() => {
    return (
      <Carousel
        navContainerClass="arrow-class"
        data={dataListActor}
        slideBy={5}
      >
        {dataListActor?.data?.cast?.map((cast) => {
          return (
            <div className="card-cast">
              <div>
                <a className="link-actor" href={`/actor/${cast?.id}`}>
                  <figure>
                    <img
                      src={
                        cast?.profile_path
                          ? `https://image.tmdb.org/t/p/original${cast?.profile_path}`
                          : "https://i.imgur.com/wLJJctg.png"
                      }
                      className="img-actor"
                    />
                  </figure>
                </a>
                <p className="name-actor" align="center">
                  {cast?.name}
                </p>
                <p class="character" align="center">
                  {cast?.character}
                </p>
              </div>
            </div>
          );
        })}
      </Carousel>
    );
  }, [dataListActor]);

  if (dataListActor?.loading || dataMovieDetail?.loading) {
    return (
      <div className="container_1">
        <h1>??ang t???i d??? li???u</h1>
      </div>
    );
  } else {
    return (
      <div className="container_1">
        <Header />
        <div
          className="backdrop"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original${dataMovieDetail?.data?.backdrop_path}")`,
          }}
        ></div>
        <section className="section-movie">
          <div className="shiftup">
            <div className="detail-movie">
              <div className="detail-movie-left">
                <p className="img-poster">
                  <img
                    src={`https://image.tmdb.org/t/p/original${dataMovieDetail?.data?.poster_path}`}
                  />
                </p>
              </div>
              <div className="detail-movie-right">
                <h1 className="title">
                  {dataMovieDetail?.data?.original_title}
                </h1>
                <h2 className="subtitle">{dataMovieDetail?.data?.title}</h2>
                <br></br>
                <p>2 gi??? 35 ph??t</p>
                <ImdbIcon score={dataMovieDetail?.data?.vote_average} />
                <dl class="horizontal-dl">
                  <dt>?????o di???n</dt>
                  <dd class="csv">
                    <a href="/">Denis Villeneuve</a>
                  </dd>
                  <dt>Qu???c gia</dt>
                  <dd class="csv">
                    {dataMovieDetail?.data?.production_countries?.map((ct) => {
                      return <a href="/country/CA">{ct.name}</a>;
                    })}
                  </dd>
                  <dt>Kh???i chi???u</dt>
                  <dd>{dataMovieDetail?.data?.release_date}</dd>
                </dl>
                <div className="intro">{dataMovieDetail?.data?.overview}</div>
                <div className="cast">
                  <h3 className="section-header">Di???n vi??n</h3>
                  {Carouselrender}
                </div>
                <div>
                  <Element
                    className="section-header-group"
                    ref={listerRef}
                    name="scroll-to-element"
                  >
                    <h3 className="section-header">Ng?????i d??ng ????nh gi??</h3>
                    <button
                      href="/"
                      className="add-review"
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      + Th??m ????nh gi??
                    </button>
                  </Element>
                  <div className="lister">
                    <div className="header-lister">
                      <div>
                        <span>{postData?.totalItems} ????nh gi??</span>
                      </div>
                      <form name="lister-controls">
                        <div className="lister-controls">
                          <div className="lister-controls-group">
                            {"L???c theo x???p h???ng:  "}
                            <select name="sort">
                              <option value={0}>T???t c???</option>
                            </select>
                          </div>
                          <div className="lister-controls-group">
                            {"S???p x???p theo th???i gian:  "}
                            <select name="time">
                              <option value={0}>M???i nh???t</option>
                            </select>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="lister-list">
                      {!dataPost?.loading
                        ? postData?.items?.map((post) => {
                            return (
                              <div className="lister-item">
                                <div className="container-item">
                                  <div className="user-rating">
                                    <svg
                                      class="star-icon"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="#000000"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      width="24"
                                    >
                                      <path
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                      ></path>
                                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                      <path
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                      ></path>
                                    </svg>
                                    <span>{post?.point}</span>
                                    <span>/5</span>
                                  </div>
                                  <p className="title-review">Qu?? xu???t s???c</p>
                                  <div class="display-name-date">
                                    <span class="display-name-link">
                                      <a href="/">Trung Hoang</a>
                                    </span>
                                    <span class="review-date">
                                      {moment(post?.time).format(
                                        "YYYY-MM-DD HH:mm"
                                      )}
                                    </span>
                                  </div>
                                  <div className="content-review">
                                    <div>{post?.content}</div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        : null}
                    </div>
                    <Pagination
                      totalRecords={postData?.totalItems}
                      pageLimit={10}
                      pageNeighbours={1}
                      onPageChanged={(data) => {
                        onPageChanged(data);
                      }}
                    />
                  </div>
                </div>
              </div>
              <Modal show={showModal} setShow={setShowModal}>
                <ModalHeader>
                  <h2 className="title-modal">
                    {dataMovieDetail?.data?.original_title}
                  </h2>
                </ModalHeader>
                <ModalBody>
                  <StarRating
                    getStar={(star) =>
                      setPost({
                        ...post,
                        fields: { ...post.fields, point: star },
                      })
                    }
                  />
                  {post.errors["point"] && (
                    <p style={{ color: "red" }}>!!!{post.errors["point"]}</p>
                  )}
                  <div>
                    <div>
                      <input
                        type="text"
                        placeholder="Vi???t ti??u ????? cho ????nh gi?? c???a b???n ??? ????y"
                        className="headline-input"
                      />
                    </div>
                    <div>
                      <textarea
                        className="headline-input review-input"
                        maxLength="10000"
                        rows={6}
                        placeholder="Vi???t nh???n x??t c???a b???n ??? ????y"
                        onChange={handleChange}
                      ></textarea>
                      {post.errors["content"] && (
                        <p style={{ color: "red" }}>
                          !!!{post.errors["content"]}
                        </p>
                      )}
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button
                    onClick={handlePost}
                    className="btn btn-outline-success w-100"
                  >
                    {post.loading ? (
                      <div
                        class="spinner-border text-danger"
                        role="status"
                      ></div>
                    ) : (
                      "????ng"
                    )}
                  </button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Movies;
