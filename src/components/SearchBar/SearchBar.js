import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";
import { connect } from "react-redux";
import { useHistory } from "react-router";
// import { useQuery } from "../../functions/useQuery";
import { cleanForm } from "../../store";
import { useOutsideClick } from "../../functions/useOutsideClick";
import { useCookies } from "react-cookie";

function SearchBar({
  pageName = "Members",
  cleanForm,
  page,
  count,
  className,
  placeholder = "search",
  setOpen,
  inputClass,
}) {
  // const query = useQuery();

  const history = useHistory();
  const [clickInput, setClickInput] = useState(false);
  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];
  const ref = useRef();

  const [value, setValue] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    // cleanForm();
    const urlParams = new URLSearchParams();

    urlParams.set("search", value);
    // urlParams.set("page", page);

    if (pageName === "news/archive") {
      history.push(`/${pageName}?${urlParams}`);
    } else {
      history.push(`/pages/${pageName}?${urlParams}`);
    }

    setOpen(false);
  };

  useEffect(() => {
    setValue("");

    history.replace({
      search: "",
    });
  }, []);

  const handleOutsideClick = () => {
    setClickInput(false);
  };

  useOutsideClick(ref, handleOutsideClick);

  return (
    <div
      className={`searchbar ${
        clickInput ? "searchbar-width" : ""
      } ${className}`}
      ref={ref}
    >
      <form
        className="flex-space-between position-relative"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          id="search"
          className={`searchbar-input color-white ${inputClass}`}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onClick={() => setClickInput(true)}
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          lang={lng}
        />

        <div
          className={`searchbar-icon members-page-search-icon cursor-pointer`}
          onClick={handleSearch}
        >
          <img
            alt=""
            src={require("../../images/search-icon.svg").default}
            className="search-icon-img"
          />
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    cleanForm: () => dispatch(cleanForm()),
  };
};
export default connect(null, mapDispatchToProps)(SearchBar);
