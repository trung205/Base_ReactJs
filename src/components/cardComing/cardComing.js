import "./cardComing.css";
function CardComing(props) {
  const { number, srcImg, children, href } = props;
  return (
    <a className="card-movie-coming" href={href}>
      <div className="number">
        <h2>{number}</h2>
      </div>
      <div className="poster-movie-coming">
        <img src={srcImg} className="img-poster-movie-coming" />
      </div>
      <div className="info-movie-coming">{children}</div>
    </a>
  );
}

export default CardComing;
