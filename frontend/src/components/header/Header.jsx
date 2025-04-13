import React, { useState } from 'react'
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import logo from '/logo.png'

const Header = () => {
  const [hideLeft, setHideLeft] = useState("-left-[1000px]");
  const menuItems = [
    { name: "recipes", path: "/recipes" },
    { name: "Reverse Recipe Search", path: "/RecipeRecommendation" },
    { name: "Freshness Detection", path: "/imageClassification" },
    { name: "Voice Assistant", path: "/voiceAssistant" }
  ];

  const onOpen = () => {
    setHideLeft("left-0");
  };
  const onClose = () => {
    setHideLeft("-left-[1000px]");
  };

  return (
    <>
      <div className="max-[900px]:hidden">
        <DesktopNav menuItems={menuItems} logo={logo} />
      </div>
      <div className="min-[900px]:hidden">
        <MobileNav
          menuItems={menuItems}
          logo={logo}
          onClose={onClose}
          hideLeft={hideLeft}
          onOpen={onOpen}
        />
      </div>
    </>
  );
};


export default Header