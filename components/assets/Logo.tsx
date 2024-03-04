import React from "react";

const Logo = () => {
  return (
    <>
      <div className="relative">
        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-b-[17px] border-base-content border-r-[10px] border-r-transparent transition-all"></div>
        <div className="absolute bottom-[-6px] right-[-5px] w-[15px] h-[15px] bg-primary rounded-full mix-blend-screen transition-all"></div>
      </div>
    </>
  );
};

export default Logo;
