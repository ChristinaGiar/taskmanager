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
        <div className='centered'>
          <input type="text" className={`inputTitle ${classes.modalTitle}`} name="title" defaultValue={props.title} />
          <div className={classes.modalStatus}>{props.icon}</div>
          <p>Description:</p>
          <input type="text" className={`w-100 ${classes.modalContent}`} name="content" defaultValue={props.content} />
          <div><span>Progress: </span><span><input type="number"></input> </span></div>
        </div>
      </div>
    </div>
  )
}

export default Modal;