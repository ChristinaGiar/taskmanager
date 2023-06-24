import React from "react";
import { useDrop } from "react-dnd";

import classes from "./DropWrapper.module.css";

const DropWrapper = ({ onDrop, children, status }) => {
    const [{ isOver }, drop] = useDrop({
        accept: "task",
        drop: (item, monitor) => {
            onDrop(item, monitor, status);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div ref={drop} className={`${classes.dropWrapper} ${isOver ? classes.highlight : ''}`}>
            {React.cloneElement(children)}
        </div>
    )
};

export default DropWrapper;