import React from 'react';
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { RiCloseCircleLine } from "react-icons/ri";

const MobileNav = ({ menuItems, logo, onClose, onOpen, hideLeft, isLoggedIn, userName, onLogout }) => {
  return (
    <>
      <div className="h-16 flex justify-between items-center px-6 lg:px-12">
        <a href="/">
          <img src={logo} alt="site logo" />
        </a>
        <button className="border border-primary rounded" onClick={onOpen}>
          <HiOutlineBars3BottomRight className="w-7 h-6" />
        </button>
      </div>

      <div className={`transition-all w-full h-full fixed bg-primary z-50 top-0 ${hideLeft} flex justify-center items-center`}>
        <button className="absolute right-8 top-32" onClick={onClose}>
          <RiCloseCircleLine className="w-7 h-6" />
        </button>

        <div>
          <ul className="flex flex-col gap-5 items-center">
            {menuItems?.map((menu, index) => (
              <li key={index}>
                <a
                  href={menu.path}
                  className="font-medium capitalize text-secondary text-2xl"
                  onClick={onClose}
                >
                  {menu.name}
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex flex-col items-center gap-4 font-medium mt-10">
            {isLoggedIn ? (
              <>
                <li className="text-secondary text-xl">Hello, {userName}</li>
                <li>
                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded text-xl hover:bg-red-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/login" className="text-secondary px-4 py-2 rounded text-xl" onClick={onClose}>
                    Log In
                  </a>
                </li>
                <li>
                  <a href="/register" className="bg-white text-primary px-4 py-2 rounded border text-xl" onClick={onClose}>
                    Sign Up
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
