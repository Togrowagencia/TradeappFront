import React from "react";

const LinkSection = ({ link, handleLinkChange }) => {
  return (
    <div className="w-full h-[7vh] bg-[#1E1E1E] rounded-[10px] flex items-center m-2 py-7 px-6">
      <h4 className="blanco w-[12%]">Link Section</h4>
      <input
        className="rounded-[10px] gris-carbon-bg w-[88%] h-[1%] textos blanco p-4 focus:border-[0px] focus:outline-none"
        value={link}
        onChange={(e) => handleLinkChange(e.target.value)}
      ></input>
    </div>
  );
};

export default LinkSection;
