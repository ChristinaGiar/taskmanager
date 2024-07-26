import React, { useContext, useState } from 'react'
import classes from './TitleModal.module.css'

import AuthContext from '../store/auth-context'
import { StatuSelect } from './StatuSelect'

const TitleModal = ({ status, onClose, nodeRef }) => {
  const crx = useContext(AuthContext)
  console.log('status', status)

  const [inputValues, setInputValues] = useState({
    status: status.status,
    icon: status.icon,
  })
  const [isTitleDisabled, setIsTitleDisabled] = useState(true)

  const onCloseHandler = () => {
    onClose()
  }

  const saveDataHandler = (e) => {
    e.preventDefault()
    console.log('crx.items', crx.items)
    crx.changeStatusesHandler({
      id: status.id,
      status: inputValues.status,
      icon: inputValues.icon,
    })
    onClose()
  }

  const titleChangeHandler = (e) => {
    setInputValues((prevState) => ({ ...prevState, status: e.target.value }))
  }

  const iconChangeHandler = (icon) => {
    setInputValues((prevState) => ({ ...prevState, icon: icon }))
  }

  return (
    <div className={classes.overlay}>
      <div className={`${classes.modal} transition-modal`} ref={nodeRef}>
        <i
          className={`fa-solid fa-xmark ${classes.modalExit}`}
          onClick={onCloseHandler}
        ></i>
        <form onSubmit={saveDataHandler}>
          <div className={classes.modalFields}>
            <StatuSelect
              icon={inputValues.icon || status.icon}
              iconChange={iconChangeHandler}
            />
            <div className={classes.modalTitleWrapper}>
              <input
                type='text'
                className={`inputTitle ${classes.modalTitle}`}
                name='title'
                onChange={titleChangeHandler}
                value={inputValues.status}
                disabled={isTitleDisabled}
              />
              <div className={classes.modalIconWrapper}>
                <i
                  className={`fa-solid ${
                    isTitleDisabled ? 'fa-pen' : 'fa-check'
                  } ${classes.modalIcon}`}
                  onClick={() => setIsTitleDisabled(!isTitleDisabled)}
                ></i>
              </div>
            </div>
          </div>
          <button
            className={`${classes.modalButton} ${classes.modalOutlineButton}`}
            onClick={onCloseHandler}
          >
            Cancel
          </button>
          <button type='sybmit' className={classes.modalButton}>
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

export default TitleModal
