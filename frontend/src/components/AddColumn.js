import React from 'react';

const AddColumn = (props) => {
    const addColumnHandler = () => {
        props.addColumn();
    }
  return (
    <div className={"col-6 col-sm-4 col-md-3"} onClick={addColumnHandler}>
      <div className={"add-column"}> +  Add a column</div>
      </div>
  )
}

export default AddColumn;