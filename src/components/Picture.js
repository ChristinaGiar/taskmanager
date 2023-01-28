import React from 'react';
import { useDrag } from "react-dnd";
import SinglePicture from "./SinglePicture";

function Picture({ id, url }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image", // tpe of draggable item
        item: {id: id}, // pass parametres accessible from board
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))
    return (
    // <SinglePicture drag={drag} url={url} isDragging={isDragging}/>
    <img
        ref={drag} // declare draggable item in order to track its position
        src={url} width="150px"
        style={{ border: isDragging ? "5px solid pink" : "0" }}/>)
        

}

export default Picture