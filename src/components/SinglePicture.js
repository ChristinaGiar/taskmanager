import React from 'react'

function SinglePicture(drag, url, isDragging) {
  return (
    <img
        ref={drag} // declare draggable item in order to track its position
        src={url} width="150px"
        style={{ border: isDragging ? "5px solid pink" : "0" }}/>
  );
}

export default SinglePicture