import React, { useState } from "react";

const AddTask = (props) => {

    const addItemHandler = () => {
        props.addItem(props.status);
        console.log(props.items);
    }

    return (
        <div className={""} onClick={addItemHandler}>
            Add a task
        </div>
    );
};

export default AddTask;