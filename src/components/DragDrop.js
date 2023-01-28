import React, { useState } from 'react';
import Picture from './Picture';
import {useDrop} from 'react-dnd';


let PicturesList = [
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1539&q=80"
    },
    {
        id: 3,
        url: "https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=728&q=80"
    }
]
function DragDrop() {

    const [board, setBoard] = useState([]); // declare the final destination/pictures here

    const [{isOver}, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addImageToBoard(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }));

    const addImageToBoard = (id) => {
        console.log("Dragging is over"); // printed when isOver is true
        const pictureList = PicturesList.filter((picture) => id === picture.id); // find the dragged image
        PicturesList = PicturesList.filter((picture) => id !== picture.id);
        setBoard((board) => [...board, pictureList[0]]); // add to the board
    }

  return (
    <>
    <div className='Pictures'> 
    {PicturesList.map((picture) => {
        return <Picture key={picture.id} id={picture.id} url={picture.url}/>;
    })} </div>
    <div className='Board' ref={drop} style={{border: '2px solid black', width: '500px', height: '500px', color: isOver}}>
    {board.map((picture) => {
        return <Picture key={picture.id} url={picture.url} id={picture.id} />;
    })}
    </div>
    </>
  )
}

export default DragDrop;