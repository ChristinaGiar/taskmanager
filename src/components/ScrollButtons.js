import React from 'react'

const ScrollButtons = () => {

    const scrollLeftHandler = () => {
            document.querySelector("my-scroll-container").scrollLeft += 30;
    }

    const scrollRightHandler = () => {
        document.querySelector("my-scroll-container").scrollLeft -= 30;
}

  return (
    <>
    <button className="button-left" onClick={scrollLeftHandler}>Left</button>
    <button className="button-right" onClick={scrollRightHandler}>Right</button>
    </>
  )
}

export default ScrollButtons