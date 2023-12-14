import React, { useState, useEffect, useRef } from "react";
import "../../../../components/List/List.css";
import { useCookies } from "react-cookie";
import { useQuery } from "../../../../functions/useQuery";
import { useParams } from "react-router-dom";

function ListSpeakersOfEvent({
  Component,
  className,
  ListHeaderComponent = () => null,
  arrowColor,
  url = "",
  arrowActive = true,
}) {
  const query = useQuery();
  let ref = useRef();
  const [cookies] = useCookies();
  let scrollLeftValue = 0;
  const [scrollSize, setScrollSize] = useState(0);
  const [scrollSizeStory, setScrollSizeStory] = useState(0);
  const [isPrevExist, setIsPrevExist] = useState(false);
  const [isNextExist, setIsNextExist] = useState(true);
  const [lng, setLng] = useState(cookies.lang ? cookies.lang : "en");


  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const { eventCardId } = useParams();

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (query.get("search") && query.get("search") !== "") {
      setSearchValue(query.get("search"));
      setData([]);
      setPage(1);
    } else {
      setSearchValue(query.get("search"));
      setData([]);
      setPage(1);
    }

  }, [query]);


  useEffect(() => {
    setData([]);
    setPage(1);
  }, [cookies.lang]);

  useEffect(() => {
    getData(page);
  }, [page]);



  useEffect(() => {
    getData(1);
  }, [cookies.lang]);

  useEffect(() => {
    ref.current.style.scrollBehavior = "smooth";

    // get width(includes margins & border) of list's current component
    const elementSize =
      ref.current && ref.current.firstChild && data.length > 0
        ? ref.current.firstChild.offsetWidth
        : 0;
    setScrollSize(elementSize);

    if (ref.current.offsetWidth >= ref.current.scrollWidth) {
      setIsNextExist(false);
      setIsPrevExist(false);
    }
  }, [data]);

  const needFetch = () => {
    const rightPart =
      ref.current.scrollWidth -
        ref.current.scrollLeft -
        ref.current.clientWidth <=
      scrollSize;
    if (rightPart) {
      return true;
    } else return false;
  };

  const setScrollLeftValue = (callback) => {
    if (needFetch()) {
      getData(page);
    }
    scrollLeftValue = ref.current.scrollLeft;
    scrollLeftValue = callback(scrollLeftValue);
    if (scrollLeftValue > 0) {
      ref.current.scrollLeft = scrollLeftValue;
      setIsPrevExist(true);

      if (
        ref.current.offsetWidth + ref.current.scrollLeft >=
        ref.current.scrollWidth
      ) {
        setIsNextExist(false);
      } else {
        setIsNextExist(true);
      }
    } else {
      scrollLeftValue = 0;
      ref.current.scrollLeft = 0;
      // setIsPrevExist(false);
      setIsNextExist(true);
    }

    if (ref.current.offsetWidth >= ref.current.scrollWidth) {
      setIsNextExist(false);
      setIsPrevExist(false);
    }

    if (loading) {
      setIsNextExist(true);
    }
  };


  const getData = async (page) => {
    var userLang = navigator.language || navigator.userLanguage;

    const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];
    // check search value
    console.log("mtav");
    if (!allLoaded && !loading) {
     
      setLoading(true);
      var userLang = navigator.language || navigator.userLanguage;

      const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];
      await fetch(`/api/events/event/details/${eventCardId}?lng=${lng}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setIsNextExist(true);

          setData(data.event.speakers);
          setPage(page + 1);
        })
        .catch((error) => {})
        .then(() => {
          setLoading(false);
        });
    }
  };



  const onScroll = () => {
    if (ref.current.scrollLeft > 0) {
      setIsPrevExist(true);
      if (
        ref.current.offsetWidth + ref.current.scrollLeft >=
        ref.current.scrollWidth
      ) {
        setIsNextExist(false);
      } else {
        setIsNextExist(true);
      }
    } else {
      setIsPrevExist(false);
      setIsNextExist(true);
    }
    if (needFetch()) {
      getData(page);
    }
  };

  return (
    <div className="list-container">
      <div className="list-items-container" ref={ref} onScroll={onScroll}>
        {data && data.length
          ? data.map((item) => {
              return (
                <div key={item} className="slide">
                  <Component cardData={item} />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default ListSpeakersOfEvent;
