import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  //props coming from StreamDelete
  return ReactDOM.createPortal(
    <div
      //   onClick={() => history.push("/")}
      onClick={props.onDismiss}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    //make sure that second element Modal element is attached to the
    // body of the HTML
    document.querySelector("#modal")
  );
};

export default Modal;
