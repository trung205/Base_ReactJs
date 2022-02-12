import React, { useEffect, useState } from "react";
import "./movies.css";
import ImdbIcon from "../../../components/imdbIcon/imdbIcon";
import Carousel from "../../../components/carousel/carousel";
import StarRating from "../../../components/starRating/starRating";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../../components/modal/modal";

function Movies() {
  const [showModal, setShowModal] = useState(false);
  const [headline, setHeadline] = useState(null);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  useEffect(() => {
    document.querySelector(".backdrop").style.backgroundImage =
      "url('https://image.tmdb.org/t/p/original/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg')";
  });

  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return (
    <div className="container_1">
      <div className="backdrop"></div>
      <section className="section">
        <div className="shiftup">
          <div className="detail-movie">
            <div className="detail-movie-left">
              <p className="img-poster">
                <img src="https://image.tmdb.org/t/p/w342/d5NXSklXo0qyIYkgV94XAgMIckC.jpg" />
              </p>
            </div>
            <div className="detail-movie-right">
              <h1 className="title">Dune</h1>
              <h2 className="subtitle">Hành tinh cát (2021)</h2>
              <br></br>
              <p>2 giờ 35 phút</p>
              <ImdbIcon score="8.1" />
              <dl class="horizontal-dl">
                <dt>Đạo diễn</dt>
                <dd class="csv">
                  <a href="/">Denis Villeneuve</a>
                </dd>
                <dt>Quốc gia</dt>
                <dd class="csv">
                  <a href="/country/CA">Canada</a>
                  <a href="/country/US">Mỹ</a>
                </dd>
                <dt>Khởi chiếu</dt>
                <dd>9/15/2021</dd>
              </dl>
              <div className="intro">
                "Bộ phim theo chân nhân vật chính là Paul Atreides - con trai
                của Leto Atreides (người cai trị hành tinh đại dương Caladan và
                là người được hoàng đế Pafishah Shaddam IV giao nhiêm vụ quản lý
                hành tịnh Arrakis sa mạc khắc nghiệt hay thường được biết đến
                với tên gọi DUNE). Tại đây, tồn tại một vật chất quý giá "the
                spices" (gia vị) - thứ thần dược giúp kéo dài sự sống và tăng
                cường trí lực cho con người. Chính vì điều này, gia tộc Atreides
                trở thành mục tiêu tấn công của nhiều gia tộc khác trong đó có
                nhà Harkonnen."
              </div>
              <div className="cast">
                <h3 className="section-header">Diễn viên</h3>
                <Carousel navContainerClass="arrow-class">
                  {arr.map((cast) => {
                    return (
                      <div className="card-cast">
                        <div>
                          <a>
                            <figure>
                              <img src="https://image.tmdb.org/t/p/w138_and_h175_face/tpb0eZLDvIaBVNLXFpxXAdPxooo.jpg" />
                            </figure>
                          </a>
                          <p className="name-actor">Kim Da-mi</p>
                          <p class="character">Guk Yeon-su</p>
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              </div>
              <div>
                <div className="section-header-group">
                  <h3 className="section-header">Người dùng đánh giá</h3>
                  <button
                    href="/"
                    className="add-review"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    + Thêm đánh giá
                  </button>
                </div>
                <div className="lister">
                  <div className="header-lister">
                    <div>
                      <span>3 đánh giá</span>
                    </div>
                    <form name="lister-controls">
                      <div className="lister-controls">
                        <div className="lister-controls-group">
                          {"Lọc theo xếp hạng:  "}
                          <select name="sort">
                            <option value={0}>Tất cả</option>
                          </select>
                        </div>
                        <div className="lister-controls-group">
                          {"Sắp xếp theo thời gian:  "}
                          <select name="time">
                            <option value={0}>Mới nhất</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="lister-list">
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
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                            <path d="M0 0h24v24H0z" fill="none"></path>
                          </svg>
                          <span>8</span>
                          <span>/10</span>
                        </div>
                        <p className="title-review">Quá xuất sắc</p>
                        <div class="display-name-date">
                          <span class="display-name-link">
                            <a href="/">Trung Hoang</a>
                          </span>
                          <span class="review-date">1 December 2019</span>
                        </div>
                        <div className="content-review">
                          <div>
                            {
                              "Đã đọc cuốn sách cách đây một trăm năm, phải mất một thời gian để bắt đầu hiểu chuyện gì đang xảy ra. Nếu có một lời phê bình mà nhiều người chia sẻ thì đó là nhịp độ của phần đầu phim. Nó cần một thứ gì đó để tạo bối cảnh cho chúng tôi, cho chúng tôi thấy ai là kẻ mạnh và kẻ yếu. Tôi không thích tường thuật nhiều (cho tôi xem, đừng nói với tôi), nhưng nó có thể không phải là một ý kiến ​​tồi. Các cảnh đẹp tuyệt vời với các hiệu ứng đặc biệt khỏi bảng xếp hạng. Nhiều cảnh du hành trên sa mạc khá dài vô tận. Làm thế nào để bạn nhổ bỏ một sa mạc. Tôi nghĩ rằng những con sâu cát là một chiều nhỏ. Tôi biết có một bộ phim khác đang được triển khai"
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Modal show={showModal} setShow={setShowModal}>
              <ModalHeader>
                <h2 className="title-modal">Dune (2021)</h2>
              </ModalHeader>
              <ModalBody>
                <StarRating />
                <div>
                  <div>
                    <input
                      type="text"
                      placeholder="Viết tiêu đề cho đánh giá của bạn ở đây"
                      className="headline-input"
                    />
                  </div>
                  <div>
                    <textarea
                      className="headline-input review-input"
                      maxLength="10000"
                      rows={6}
                      placeholder="Viết nhận xét của bạn ở đây"
                    ></textarea>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button onClick={() => setShowModal(false)}>Close</button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Movies;
