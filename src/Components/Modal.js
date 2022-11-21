import React from "react";

const Modal = (props) => {
    return (
        <div className="modal_container">
            <h2 className="modal_title">Quizzical</h2>
            <h3 className="modal_descr">Play intelligent game, test your knowledge!</h3>
            <button className="modal_btn" onClick={props.onHideModal}>Start quiz</button>

        </div>
    )
}

export default Modal