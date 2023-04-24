import React from 'react'

const AddColumn = (props) => {
    const addColumnHandler = () => {
        props.addColumn();
    }
  return (
    <div onClick={addColumnHandler}>+</div>
  )
}

export default AddColumn;