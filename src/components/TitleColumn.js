import { useRef, useState } from 'react'
import TitleModal from './TitleModal'
import { CSSTransition } from 'react-transition-group'
import ReactDOM from 'react-dom'

const TitleColumn = ({ status }) => {
  const [columnTitleClicked, setColumnTitleClicked] = useState(false)
  const nodeRef = useRef(null)

  const toggleModal = () => {
    setColumnTitleClicked((prevState) => !prevState)
  }

  return (
    <>
      <h2 className='header' onClick={toggleModal}>
        {status.status.toUpperCase()}
      </h2>
      <CSSTransition
        nodeRef={nodeRef}
        in={columnTitleClicked}
        timeout={200}
        classNames='modal'
      >
        <>
          {columnTitleClicked &&
            ReactDOM.createPortal(
              <TitleModal
                nodeRef={nodeRef}
                isClicked={columnTitleClicked}
                status={status}
                onClose={toggleModal}
              />,
              document.getElementById('overlay-root')
            )}
        </>
      </CSSTransition>
    </>
  )
}
export default TitleColumn
