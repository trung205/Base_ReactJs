import "./menu.css";
function Menu(props) {
  const { onClickClose, children } = props;
  return (
    <div className="menu">
      <div className="close-menu" onClick={onClickClose}>
        <span className="x-button"></span>
      </div>
      <div className="link-list">{children}</div>
    </div>
  );
}

export default Menu;
