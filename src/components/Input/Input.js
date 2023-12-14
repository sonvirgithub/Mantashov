import React, { useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { handleFormChange } from "../../store";
import "./Input.css";

function Input({
  type = "text",
  name = "",
  placeholder = "",
  className = "",
  id,
  value = "",
  formOnChange,
  label = "",
  maxLength = "43",
  joinName,
}) {
  // const [showPassword, setShowPassword] = useState(false);
  const [inputChange, setInputChange] = useState(false);
  // const [inputPhone, setInputPhone] = useState("input-phone-black");
  const [cookies] = useCookies(["lang"]);

  var userLang = navigator.language || navigator.userLanguage;
  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const inputRef = useRef();
  const handleOnChange = (e) => {
    // if (id === "joinPhone" && e.target.value && e.target.value !== "") {
    //   setInputPhone("input-phone-white");
    // } else {
    //   setInputPhone("input-phone-black");
    // }

    if (id === "joinPhone") {
      if (e.target.value === "+" && e.target.value.length === 1) {
        formOnChange(id, e.target.value);
      } else if (!e.target.value.match(/[a-z]/i)) {
        formOnChange(id, e.target.value);
      }
    } else {
      formOnChange(id, e.target.value);
      if (!e.target.value) {
        e.target.title = "Տվյալ դաշտը պարտադիր է";
      } else if (e.target.type === "email" && !e.target.value.includes("@")) {
        e.target.title = "Սխալ Էլ․ հասցե";
      } else {
        e.target.title = "";
      }
      setInputChange(true);
    }
  };

  //   const onClick = () => {
  //     inputRef.current.style.border = "2.5px solid #93c7ff";
  //   };

  //   useEffect(() => {
  //     inputRef.current.style.border = "1.5px solid #93c7ff";
  //   }, [id]);

  const handleOnInvalid = (e) => {
    if (!e.target.value) {
      e.target.setCustomValidity("Տվյալ դաշտը պարտադիր է");
    } else if (e.target.type === "email" && !e.target.value.includes("@")) {
      e.target.setCustomValidity("Սխալ Էլ․ հասցե");
    } else {
      e.target.setCustomValidity("");
    }
  };
  return (
    <div style={{ margin: "39px 0 0 0" }}>
      <p className="input_label color-white  font-size-14" lang={lng}>
        {name}
      </p>
      <div style={{ position: "relative" }}>
        <input
          ref={inputRef}
          // type={type}
          className={`input_component font-bold-700 ${className}`}
          id={id}
          onInvalid={handleOnInvalid}
          title="Տվյալ դաշտը պարտադիր է"
          name={name}
          onChange={handleOnChange}
          autoComplete="off"
          value={value ?? ""}
          maxLength={maxLength}
          placeholder={placeholder}
          lang={lng}
        />
        <div
          className={`input-arrow-icon position-absolute cursor-pointer 
        `}
        >
          {/* {
                        inputChange ? <img src={require("../../images/arrow-white-right-for-input.svg").default} />
                        : <img src={require("../../images/arrow-black-right-for-input.svg").default} />
                    } */}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.formReducer[ownProps.id],
    joinName: state.formReducer.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    formOnChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Input);
