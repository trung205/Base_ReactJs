import React, { useEffect, useState } from "react";
import "./actor.css";
import Header from "../../../components/header/header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadActor } from "../../../redux/action/index";
import {
  requestMovieByActor,
  requestListImageActor,
} from "../../../common/axios";

function Actor() {
  const params = useParams();
  console.log(params, "id");
  const dispatch = useDispatch();
  const [listMovie, setListMovie] = useState(null);
  const [image, setImage] = useState(null);
  const actorInfo = useSelector((state) => state.actor);

  useEffect(() => {
    dispatch(loadActor(params.id));
  }, []);

  useEffect(async () => {
    try {
      const res = await requestMovieByActor(params.id);
      setListMovie(res);
    } catch (error) {
      console.log("có lỗi xảy ra", error);
    }
  }, []);

  useEffect(async () => {
    try {
      const response = await requestListImageActor(params.id);
      setImage(response);
    } catch (error) {
      console.log("có lỗi xảy ra", error);
    }
  }, []);

  const dataActor = actorInfo.data;
  if (actorInfo?.loading || !listMovie || !image) {
    return (
      <div className="container_1">
        <h1>đang tải dữ liệu</h1>
      </div>
    );
  } else {
    return (
      <div className="container_1">
        <Header />
        <div className="section">
          <div className="section-left">
            <div className="content-left">
              <div className="avatar-actor">
                <img src={`https://image.tmdb.org/t/p/original${dataActor?.profile_path}`} />
              </div>
              <h3 class="title is-5">Thông tin cá nhân</h3>
              <dl>
                <dt>Nghề nghiệp</dt>
                <dd>{dataActor?.known_for_department}</dd>
                <dt>Giới tính</dt>
                <dd>{dataActor?.gender == 1 ? "Nữ" : "Nam"}</dd>
                <dt>Ngày sinh</dt>
                <dd>{dataActor?.birthday}</dd>
                <dt>Nơi sinh</dt>
                <dd>{dataActor?.place_of_birth}</dd>
              </dl>
            </div>
          </div>
          <div className="section-right">
            <h1>{dataActor?.name}</h1>
            <h3>Tiểu sử</h3>
            <div>
              Seo Ju-hyun (Hangul: 서현, sinh ngày 28 tháng 6 năm 1991), được
              biết đến với nghệ danh Seohyun, là một nữ ca sĩ và diễn viên Hàn
              Quốc. Seohyun là thành viên của nhóm nhạc nữ K-pop, Girls
              'Generation, và nhóm phụ đầu tiên của nhóm, TaeTiSeo (TTS). Cô ấy
              đã ra mắt ca hát solo với đĩa đơn chính, Don't Say No và một
              mini-album cùng tên. Là một nữ diễn viên, Seohyun được biết đến
              qua các vai diễn trong các vở nhạc kịch Moon Embracing The Sun,
              Gone With The Wind và Mamma Mia và các bộ phim truyền hình Moon
              Lovers: Scarlet Heart Ryeo, Good Thief, Bad Thief và Time.
            </div>
            <h3>Các phim đã tham gia</h3>
            <div className="list-film">
              {listMovie?.cast?.map((movie) => {
                return (
                  <div className="list-film-item">
                    <p className="list-film-content" >
                      <a href={`/movies/${movie?.id}`} >
                        <img
                          src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                          className="item-img"
                        />
                      </a>
                      <p align="center" style={{marginTop: "20px",}}>{movie?.original_title}</p>
                      
                    </p>
                  </div>
                );
              })}
            </div>
            <h3>Ảnh</h3>
            <div className="list-film">
              {image?.profiles?.map((img) => {
                return (
                  <div className="list-film-item">
                    <p className="list-film-content">
                      <a>
                        <img
                          src={`https://image.tmdb.org/t/p/original${img?.file_path}`}
                          className="item-img"
                        />
                      </a>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Actor;
