import "./cardRelease.css";
function CardRelease(props) {
  const { children, srcImg } = props;
  return (
    <div className="card-info">
      <div className="card-img1">
        <img className="img-poster-card" src={srcImg} />
      </div>
      <a className="card-info-detail" href="/">
        {children}
      </a>
    </div>
  );
}

export default CardRelease;
