import React, { useRef, useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { handleFormChange } from "../../store";
import "./Select.css";
// import { useOutsideClick } from "../../../Hooks/useOutsideClick";
import { useOutsideClick } from "../../functions/useOutsideClick";
import { LanguageContext } from "../../App";

const Select = ({
  id = "",
  formOnChange,
  placeholder,
  name,
  value,
  type = "text",
  items = [],
  label = "",
  className = "",
  parent,
  communities,
  inputClassName = "",
  required,
}) => {
  const ref = useRef();
  const translatedData = useContext(LanguageContext);
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    setText(translatedData.new);
  }, [translatedData]);

  // useEffect(() => {
  //   if (items.length > 0) {
  //     let item = items.find((i) => i.id === value);

  //     setText(item?.name);

  //     formOnChange(id, value);
  //     setText(item === undefined ? "" : item.name);
  //   }
  // }, [items, value]);

  // useEffect(() => {
  //   if (items.length === 0 && !value) {
  //     setText("");

  //     formOnChange(id, 0);
  //   }
  // }, [items]);

  const handleSelect = () => {
    setShow(false);
  };

  const handleClick = (item) => {
    formOnChange(id, item.id);
    setText(item.name);
    setTimeout(() => setShow(false), 0);
  };

  useOutsideClick(ref, handleSelect);
  // const isEmpty = parent && items.length === 0;

  return (
    <div
      ref={ref}
      className={`select_container cursor-pointer ${
        show ? "select_container-animation" : ""
      }`}
      onClick={() => setShow(!show)}
    >
      <div className={`select-icon-animation  ${show ? "spin-animation" : ""}`}>
        <img alt="" src={require("../../images/icon-for-select.svg").default} />
      </div>
      <div
        id={id}
        className={`${required ? "requiredField" : "select_input_component"}  
          ${inputClassName}  ${className} `}
        value={text}
      >
        {text}
      </div>
      <p
        className={`select_all_component color-white  select-all-div cursor-pointer
        ${show ? "display-block-input-all" : ""}`}
        onClick={() =>
          handleClick(
            // text === "All" ? { id: 1, name: "New" } : { id: 2, name: "All" }
            text === translatedData.all
              ? { id: 1, name: `${translatedData.new}` }
              : { id: 2, name: `${translatedData.all}` }
          )
        }
      >
        <label>
          {text === translatedData.all
            ? `${translatedData.new}`
            : `${translatedData.all}`}
        </label>
      </p>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.formReducer[ownProps.id],
    // communities: state.locationReducer.communities,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    formOnChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);
