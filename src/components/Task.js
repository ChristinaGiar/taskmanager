import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useDrag, useDrop } from "react-dnd";
import Modal from './Modal';

import classes from './Task.module.css';

const Task = ({ task, index, moveItem, status }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: "task",
        hover(task, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = task.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            task.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: "task",
        item: { type: "task", ...task, index },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const [taskClicked, setTaskClicked] = useState(false);

    const toggleModal = () => {
        setTaskClicked((prevState) => (!prevState))
    }

    drag(drop(ref));

    return (
        <>
            <div
                ref={ref}
                className={`${isDragging ? classes.dashed : ""}`}
                onClick={toggleModal}
            >
                <div className={classes.task} >
                    <div className={classes.taskStatusWrapper}>
                        <div className={classes.taskStatus}>{task.icon}</div>
                    </div>
                    <p className={classes.taskTitle}>{task.title}</p>
                </div>
            </div>
            {taskClicked &&
                ReactDOM.createPortal(
                    <Modal
                        icon={task.icon}
                        title={task.title}
                        content={task.content}
                        onClose={toggleModal}
                    />, document.getElementById('overlay-root')
                )
            }
        </>
    );
};

export default Task;