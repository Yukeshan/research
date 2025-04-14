import React, { useEffect, useState } from 'react';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import logo from '/logo.png';

const Header = () => {
  const [hideLeft, setHideLeft] = useState("-left-[1000px]");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const menuItems = [
    { name: "recipes", path: "/recipes" },
    { name: "Reverse Recipe Search", path: "/RecipeRecommendation" },
    { name: "Freshness Detection", path: "/imageClassification" },
    { name: "Voice Assistant", path: "/voiceAssistant" }
  ];

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("userName"); // Assuming you store it on login
      setIsLoggedIn(!!token);
      if (token && name) {
        setUserName(name);
      }
    };

    checkAuth();
    window.addEventListener("authChanged", checkAuth);

    return () => {
      window.removeEventListener("authChanged", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    setUserName("");
    window.location.href = "/login";
  };

  const onOpen = () => setHideLeft("left-0");
  const onClose = () => setHideLeft("-left-[1000px]");

  return (
    <>
      <div className="max-[900px]:hidden">
        <DesktopNav
          menuItems={menuItems}
          logo={logo}
          isLoggedIn={isLoggedIn}
          userName={userName}
          onLogout={handleLogout}
        />
      </div>
      <div className="min-[900px]:hidden">
        <MobileNav
          menuItems={menuItems}
          logo={logo}
          onClose={onClose}
          hideLeft={hideLeft}
          onOpen={onOpen}
          isLoggedIn={isLoggedIn}
          userName={userName}
          onLogout={handleLogout}
        />
      </div>
    </>
  );
};

export default Header;