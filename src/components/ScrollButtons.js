import React from 'react';

const ScrollButtons = () => {
  const scrollRightHandler = (event) => {
    const scrollSelector = document.querySelector(".scroll-container");
    scrollSelector.scrollTo({top: 0, left: scrollSelector.scrollLeft + 30, behavior: "smooth" });
  }

  const scrollLeftHandler = (event) => {
    const scrollSelector = document.querySelector(".scroll-container");
    scrollSelector.scrollTo({top: 0, left: scrollSelector.scrollLeft - 30, behavior: "smooth" });
  }

  return (
    <div className={"scroll-buttons"}>
      <button className={"left-button"} onClick={(e) => scrollLeftHandler(e)}>
        <i className={"fa-solid fa-chevron-left"}></i>
      </button>
      <button className={"right-button"} onClick={(e) => scrollRightHandler(e)}>
        <i className={"fa-solid fa-chevron-right"}></i>
      </button>
    </div>
  )
}

export default ScrollButtons