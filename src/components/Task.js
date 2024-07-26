import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { useDrag } from 'react-dnd'
import Modal from './Modal'
import { CSSTransition } from 'react-transition-group'

import classes from './Task.module.css'

// hovered component
const Task = ({ task, deleteTask, icon }) => {
  const ref = useRef(null)
  const nodeRef = useRef(null)

  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { ...task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [taskClicked, setTaskClicked] = useState(false)

  const toggleModal = () => {
    setTaskClicked((prevState) => !prevState)
  }

  const deleteTaskHandler = (e) => {
    e.stopPropagation()
    deleteTask(task.id)
  }

  drag(ref)

  return (
    <div ref={ref}>
      <div
        className={`${isDragging ? classes.dashed : ''}`}
        onClick={toggleModal}
      >
        <div className={classes.task}>
          <i
            className={`fa-solid fa-trash-can ${classes.taskTrash}`}
            onClick={deleteTaskHandler}
          ></i>
          <div className={classes.taskStatusWrapper}>
            <div className={classes.taskStatus}>{icon}</div>
          </div>
          <p className={classes.taskTitle}>{task.title}</p>

          <div className={classes.progressWrapper}>
            <div className={classes.progress}>
              <div className={classes.progressBar}></div>
              <div
                className={`${classes.progressFilled} progressFilled`}
                style={{ '--final-width': `${task.progress || 0}%` }}
              ></div>
            </div>
            <div> {task.progress || 0} %</div>
          </div>
        </div>
      </div>
      <CSSTransition
        nodeRef={nodeRef}
        in={taskClicked}
        timeout={200}
        classNames='modal'
      >
        <>
          {taskClicked &&
            ReactDOM.createPortal(
              <Modal
                nodeRef={nodeRef}
                isClicked={taskClicked}
                task={task}
                onClose={toggleModal}
              />,
              document.getElementById('overlay-root')
            )}
        </>
      </CSSTransition>
    </div>
  )
}

export default Task
