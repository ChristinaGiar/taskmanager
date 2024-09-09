const AddColumn = ({ addColumn }) => {
  // const addColumnHandler = () => {
  //   props.addColumn()
  // }

  return (
    <div className={'col-6 col-sm-4 col-md-3'}>
      <div className={'add-column'} onClick={addColumn}>
        {' '}
        + Add a column
      </div>
    </div>
  )
}

export default AddColumn
