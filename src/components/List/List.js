import React, { useState, useEffect, useRef, useCallback } from "react";
import Arrows from "../Arrows/Arrows";
import "./List.css";
import { useCookies } from "react-cookie";
import { useQuery } from "../../functions/useQuery";

function List({
  Component,
  data1 = [],
  className,
  ListHeaderComponent = () => null,
  arrowColor,
  url = "",
  arrowActive = true,
  storiesClassName = "",
  listSpeakersOfEvent = false,
}) {
  const query = useQuery();
  let ref = useRef();
  const [cookies] = useCookies();
  let scrollLeftValue = 0;
  const [scrollSize, setScrollSize] = useState(0);
  // const [scrollSizeStory, setScrollSizeStory] = useState(0);
  const [isPrevExist, setIsPrevExist] = useState(false);
  const [isNextExist, setIsNextExist] = useState(true);

  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const [searchValue, setSearchValue] = useState("");
  const [lng, setLng] = useState(cookies.lang ? cookies.lang : "en");

  // var userLang = navigator.language || navigator.userLanguage;

  // const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  // removed for some time

  // const [mouseDown, setMouseDown] = useState(false);
  // const [startX, setStartX] = useState(null);

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
  }, [lng]);

  useEffect(() => {
    getData(page);
    console.log(url);
    if (url==="/api/members" ) {
      let arr = [
        {id:1,image:"Hrayr.png",firstName:"Hrayr",lastName:"Shahbazyan",organizationName:"AIST Global,Founder"},
        {id:2,image:"Grigori.png",firstName:"Grigori",lastName:"Zakutov",organizationName:"IT Support,Q-group"},
        {id:3,image:"",firstName:"Arman",lastName:"Hovhannisyan",organizationName:"Wholesale trade,Voske Hask,Founder"},
        {id:4,image:"",firstName:"Samvel",lastName:"Mkrtchyan",organizationName:"Winemaking Agriculture,Alluria Wines,Founder"},
        {id:5,image:"",firstName:"Koryun",lastName:"Karapetyan",organizationName:"Pharmacy Chain,Asteria Pharmaceutical Company,Deputy Director"},
        {id:6,image:"",firstName:"Lilit",lastName:"Tadevosyan",organizationName:"Marketing trainings,SMM Services,DigiLab,Founder"},
        {id:7,image:"",firstName:"Karen",lastName:"Simonyan",organizationName:"IT Support,Q-group,CEO"},
        {id:8,image:"",firstName:"Artashes",lastName:"Mkrtchyan",organizationName:"Information Technologies,VECTO,CEO"},
        {id:9,image:"",firstName:"Tigran",lastName:"Karapetyan",organizationName:"Production and sales of napkins and paper products,Soft Papyrus"},
        {id:10,image:"",firstName:"Grigor",lastName:"Abrahamyan",organizationName:"Wholesale (export),Giga Farm,CEO"},
       
       ]
       setData(arr)} else if(url==="/api/events") {
        let arr = [
          {id:1,images:["event1","event2","event3"],name:"Hrayr",eventDate:"13.12.2023",organizationName:"AIST Global,Founder"},
          {id:2,images:["event1","event2"],name:"Grigori",eventDate:"13.12.2023",description:"IT Support,Q-group"},
          {id:3,image:"",name:"Arman",eventDate:"13.12.2023",description:"Wholesale trade,Voske Hask,Founder"},
          {id:4,image:"",name:"Samvel",eventDate:"13.12.2023",description:"Winemaking Agriculture,Alluria Wines,Founder"},
          {id:5,image:"",name:"Koryun",eventDate:"13.12.2023",description:"Pharmacy Chain,Asteria Pharmaceutical Company,Deputy Director"},
          {id:6,image:"",name:"Lilit",eventDate:"13.12.2023",description:"Marketing trainings,SMM Services,DigiLab,Founder"},
          {id:7,image:"",name:"Karen",eventDate:"13.12.2023",description:"IT Support,Q-group,CEO"},
          {id:8,image:"",name:"Artashes",eventDate:"13.12.2023",description:"Information Technologies,VECTO,CEO"},
          {id:9,image:"",name:"Tigran",eventDate:"13.12.2023",description:"Production and sales of napkins and paper products,Soft Papyrus"},
          {id:10,image:"",name:"Grigor",eventDate:"13.12.2023",description:"Wholesale (export),Giga Farm,CEO"},
         
         ]
         setData(arr)
       } else if(url==="/api/news") {
        let arr = [
          {id:1,image:"story1.jpeg",title:"Lorem ipsum1",text:"lorem ipsum1",createdDate:"10.12.2023"},
          {id:2,image:"story2.png",title:"Lorem ipsum2",text:"lorem ipsum2",createdDate:"11.04.2023"},
          {id:3,image:"story3.jpeg",title:"Lorem ipsum3",text:"lorem ipsum3",createdDate:"05.08.2023"},
         
         ]
         setData(arr)
       } else {
        let arr = [
          {id:1,image:"speaker1.jpeg",fullName:"Julia Hoffman",organization:"ZCTC Comapny "},
          {id:2,image:"speaker1.jpeg",fullName:"Julia Hoffman",organization:"ZCTC Comapny "},
          {id:3,image:"speaker1.jpeg",fullName:"Julia Hoffman",organization:"ZCTC Comapny "},
          {id:4,image:"speaker1.jpeg",fullName:"Julia Hoffman",organization:"ZCTC Comapny "},
          {id:5,image:"speaker1.jpeg",fullName:"Julia Hoffman",organization:"ZCTC Comapny "},
          {id:6,image:"speaker1.jpeg",fullName:"Julia Hoffman",organization:"ZCTC Comapny "},
          {id:7,image:"speaker1.jpeg",fullName:"Julia Hoffman",organization:"ZCTC Comapny "},
          {id:8,image:"speaker1.jpeg",fullName:"Julia Hoffman",organization:"ZCTC Comapny "},
          {id:9,image:"speaker1.jpeg",fullName:"Julia Hoffman",organization:"ZCTC Comapny "},
          {id:10,image:"speaker1.jpeg",fullName:"Julia Hoffman",organization:"ZCTC Comapny "},

         
         ]
         setData(arr)
       }
  }, [page]);

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

  useEffect(() => {
    if (listSpeakersOfEvent) {
      if (ref.current.offsetWidth >= ref.current.scrollWidth) {
        setAllLoaded(true);
      }
    }
  }, [ref]);

  // removed for some time
  /*
  const startDragging = (e) => {
    setMouseDown(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    scrollLeftValue = ref.current.scrollLeft;
  };

  const stopDragging = () => {
    setMouseDown(false);
  };

  const mouseMove = (e) => {
    e.preventDefault();
    if (!mouseDown) {
      return;
    }
    const x = e.pageX - ref.current.offsetLeft;
    const scroll = x - startX;
    ref.current.scrollLeft = scrollLeftValue - scroll;
  };
*/

  // useEffect(() => {
  //   setSearchValue("");
  //   getData(1);
  // }, []);

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

  useEffect(() => {
    cookies.lang ? setLng(cookies.lang) : setLng("en");
  }, [cookies.lang]);

  const getData = async (page) => {
    

    // if (!allLoaded && !loading) {
    //   setLoading(true);
    //   await fetch(
    //     !listSpeakersOfEvent
    //       ? `${url}/${page}?lng=${lng}&searchValue=${
    //           searchValue ?? ""
    //         }&itemCount=10`
    //       : `${url}?lng=${lng}`
    //   )
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then((componentData) => {
    //       if (!listSpeakersOfEvent) {
    //         if (!componentData.length) {
    //           setAllLoaded(true);

    //           return;
    //         }
    //       } else {
    //         if (!componentData.event.speakers.length) {
    //           setAllLoaded(true);
    //           return;
    //         }
    //       }
    //       setIsNextExist(true);

    //       if (!listSpeakersOfEvent) {
    //         setData([...data, ...componentData]);
           
    //       } else {
    //         setData(componentData.event.speakers);
    //       }

    //       setPage(page + 1);
    //     })
    //     .catch((error) => {
         
    //     })
    //     .then(() => {
    //       setLoading(false);
    //     });
    // }
   
  };

  const onScroll = useCallback(() => {
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
  }, [ref, page]);

  return (
    <div className="list-container">
      <div
        className={`list-items-container ${storiesClassName}`}
        ref={ref}
        onScroll={onScroll}
        // onMouseDown={startDragging}
        // onMouseUp={stopDragging}
        // onMouseLeave={stopDragging}
        // onMouseMove={mouseMove}
      >
        {/* <ListHeaderComponent /> */}
        {data && data.length
          ? data.map((item) => {
              return (
                <div key={item.id} className="slide">
                  <Component cardData={item} />
                </div>
              );
            })
          : null}
      </div>

      {data && data.length ? (
        <div className={`list-arrows-container ${className}`}>
          {/* {arrowActive ? ( */}
          <Arrows
            color={arrowColor}
            isPrevExist={isPrevExist}
            isNextExist={isNextExist}
            handleScroll={setScrollLeftValue}
            scrollSize={scrollSize}
          />
          {/* ) : null} */}
        </div>
      ) : null}
    </div>
  );
}

export default List;
