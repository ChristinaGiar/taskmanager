import React from 'react'

const ScrollButtons = () => {

  const scrollRightHandler = () => {
    document.querySelector(".scroll-container").scrollLeft += 30;
  }

  const scrollLeftHandler = () => {
    document.querySelector(".scroll-container").scrollLeft -= 30;
  }

  return (
    <div className={"scroll-buttons"}>
      <button className={"left-button"} onClick={scrollLeftHandler}>
        <i className={"fa-solid fa-chevron-left"}></i>
      </button>
      <button className={"right-button"} onClick={scrollRightHandler}>
        <i className={"fa-solid fa-chevron-right"}></i>
      </button>
    </div>
  )
}

export default ScrollButtons