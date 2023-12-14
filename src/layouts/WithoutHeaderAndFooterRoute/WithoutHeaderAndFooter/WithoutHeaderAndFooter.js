import React from "react";

const WithoutHeaderAndFooter = ({ children, ...rest }) => {
  return (
    <div className="header-and-footer-container">
      {/* <SideBar />
      <Join/> */}
      <section>
        <article>{children}</article>
      </section>
    </div>
  );
};
export default WithoutHeaderAndFooter;
