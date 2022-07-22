import React, { Fragment, useState } from "react";

const ScrollBtn = () => {
  const [displayBtn, setDisplayBtn] = useState(false);

  const scrollLimit = () => {
    const scrolled = document.documentElement.scrollTop;
    scrolled > 800 && setDisplayBtn(true);
    scrolled <= 800 && setDisplayBtn(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", scrollLimit);

  return (
    <Fragment>
      {displayBtn && (
        <i class="fa-regular fa-circle-up scroll-btn" onClick={scrollToTop}></i>
      )}
    </Fragment>
  );
};

export default ScrollBtn;
