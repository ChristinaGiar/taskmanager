import React from 'react'
import classes from './Modal.module.css';


const Modal = (props) => {

  const onCloseHandler = () => {
    props.onClose();
  }

  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <i className={`fa-sharp fa-solid fa-x ${classes.modalExit}`} onClick={onCloseHandler}></i>
        <h2 className={classes.modalTitle}>{props.title}</h2>
        <div className={classes.modalStatus}>{props.icon}</div>
        <p className={classes.modalContent}>{props.content}</p>
      </div>
    </div>
  )
}

export default Modal;