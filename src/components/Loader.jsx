import React from "react";

const Loader = () => {
  return (
    <ul>
      <li>
        <div className="loader">
          <div className="child"></div>
        </div>
      </li>

      <li>
        <div className="my-3">
          <img src="/images/loader.png" alt="" />
        </div>
      </li>
    </ul>
  );
};

export default Loader;
