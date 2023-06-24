import React from "react";

const AddTask = (props) => {

    const addItemHandler = () => {
        props.addItem(props.status);
    }

    return (
        <div className={"add-task"} onClick={addItemHandler}>
            +
        </div>
    );
};

export default AddTask;