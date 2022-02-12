import { useEffect, useRef } from "react";
import "./modal.scss";

function Modal(props) {
  const modalRef = useRef();

  useEffect(() => {
    const clickOutsideContent = (e) => {
      if (e.target === modalRef.current) {
        props.setShow(false);
      }
    };
    window.addEventListener("click", clickOutsideContent);
    return () => {
      window.removeEventListener("click", clickOutsideContent);
    };
  }, [props]);

  return (
    <div ref={modalRef} className={`modal1 ${props.show ? "active" : ""}`}>
      <div className="modal1__content">
        {!props.hideCloseButton && (
          <span onClick={() => props.setShow(false)} className="modal1__close">
            &times;
          </span>
        )}
        {props.children}
      </div>
    </div>
  );
}

export default Modal;

export function ModalHeader(props) {
  return <div className="modal1__header">{props.children}</div>;
}

export function ModalBody(props) {
  return <div className="modal1__body">{props.children}</div>;
}

export function ModalFooter(props) {
  return <div className="modal1__footer">{props.children}</div>;
}
