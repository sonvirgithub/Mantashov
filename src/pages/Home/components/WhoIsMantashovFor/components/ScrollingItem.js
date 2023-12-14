import React, { useRef, useState, useEffect } from "react";
import "./scrollingItem.css";
import { useCookies } from "react-cookie";

function ScrollingItem({ data }) {
  let ref = useRef();

  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;

  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const delay = (ms) => {
    var date = new Date();
    var curDate = null;
    do {
      curDate = new Date();
    } while (curDate - date < ms);
  };

  const carousel = (children) => {
    if (children) {
      let fullHeight = 0;
      let beforeHeight = 0;
      for (let i = 0; i < children.length; i++) {
        fullHeight += children[i].clientHeight;
      }

      for (let i = 0; i < children.length; i++) {
        for (let j = 0; j <= i; j++) {
          beforeHeight += children[j].clientHeight;
        }

        if (parseInt(children[i].style.top.split("px")[0]) <= -beforeHeight) {
          delay(1000);
          children[i].style.top = (fullHeight - beforeHeight).toString() + "px";
        }

        children[i].style.top =
          (children[i].style.top.split("px")[0] - 1).toString() + "px";

        beforeHeight = 0;
      }
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      carousel(ref.current?.children ?? null);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="scrolling-content" ref={ref}>
      {data?.map((item, i) => {
        return (
          <div key={item.id} className="scroll">
            <div className="scrolling-item-container">
              <p
                style={{ color: `${item.color}` }}
                lang={lng}
                className="sc-item-title  font-family-auto-scroll"
              >
                {item.title}
              </p>
              <p
                className="sc-item-text color-dark-gray font-family-auto-scroll"
                lang={lng}
              >
                {item.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ScrollingItem;
