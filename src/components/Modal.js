import React, { useContext, useState, useRef } from 'react'
import classes from './Modal.module.css';

import AuthContext from '../store/auth-context';

const Modal = ({task, onClose, nodeRef}) => {

  const crx = useContext(AuthContext);

  const [inputValues, setInputValues] = useState({title: task.title, content: task.content, progress: task.progress})


  const onCloseHandler = () => {
    onClose();
  }

  const saveDataHandler = () => {
    crx.setItems(prevState => {
      let changedElement = prevState.find(el => el.id === task.id);
      if(changedElement) {
        for(let el of prevState) {
          if(JSON.stringify(el) === JSON.stringify(changedElement)) {
            el.title = inputValues.title;
            el.content = inputValues.content;
            el.progress = inputValues.progress;
          }
        } 
        return prevState;
      }
    }
    )
    onClose();
  }

  const titleChangeHandler = (e) => {
    setInputValues(prevState => ({ ...prevState, "title": e.target.value}) );
  }

  const contentChangeHandler = (e) => {
    setInputValues(prevState => ({ ...prevState, "content": e.target.value}) );
  }

  const progressChangeHandler = (e) => {
    setInputValues(prevState => ({ ...prevState, "progress": e.target.value}) );
  }

  return (
    <div className={classes.overlay}>
      <div className={`${classes.modal} transition-modal`}  ref={nodeRef}>
        <i className={`fa-sharp fa-solid fa-x ${classes.modalExit}`} onClick={onCloseHandler}></i>
        <div className='centered'>
          <input type="text" className={`inputTitle ${classes.modalTitle}`} name="title" onChange={titleChangeHandler} value={inputValues.title} />
          <div className={classes.modalStatus}>{task.icon}</div>
          <label htmlFor="content">Description</label>
          <textarea id="content" type="text" className={classes.modalContent} name="content" onChange={contentChangeHandler} value={inputValues.content} />
          <label htmlFor="progress">Progress</label>
          <div>
          <input id="progress" type="number" className={classes.modalProgress} onChange={progressChangeHandler} min="0" max="100" value={inputValues.progress}></input>
          <span> out of 100.</span>
          </div>
          <button className={`${classes.modalButton} ${classes.modalOutlineButton}`} onClick={onCloseHandler}>Cancel</button>
          <button className={classes.modalButton} onClick={saveDataHandler}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;