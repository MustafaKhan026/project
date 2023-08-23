import React from "react";

import logo from "../images/landingPage_images/tex_logo.png";

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
        <img src={logo} alt="logo" style={{width: '250px'}} className="w-32" />
      </div>
      {/* <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <p className="text-white text-base text-center mx-2 cursor-pointer">Market</p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">Exchange</p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">Tutorial</p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">About</p>
      </div> */}
    </div>

    {/* <div className="flex justify-center items-center flex-col mt-5">
      <p className="text-white text-sm text-center">This project is built for Major Project Batch A02 : KGRCET</p>
      <p className="text-white text-sm text-center font-medium mt-2">kotagiritarun@kgr.ac.in</p>
    </div> */}

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <a href="https://tarunkotagiri.engineer" className="text-white text-left text-xs">tarunkotagiri.engineer</a>
      <p className="text-white text-right text-xs">All rights reserved</p>
    </div>
  </div>
);

export default Footer;
