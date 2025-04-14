import React from 'react';

const DesktopNav = ({ menuItems, logo, isLoggedIn, userName, onLogout }) => {
  return (
    <div className="h-16 flex justify-between items-center px-6 lg:px-12">
      <a href="/">
        <img src={logo} alt="site logo" />
      </a>

      <ul className="flex gap-7">
        {menuItems?.map((menu, index) => (
          <li key={index}>
            <a href={menu.path} className="font-medium capitalize text-secondary">
              {menu.name}
            </a>
          </li>
        ))}
      </ul>

      <ul className="flex items-center gap-4 font-medium">
        {isLoggedIn ? (
          <>
            <li className="text-secondary">Hello, {userName}</li>
            <li>
              <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/login" className="text-secondary px-4 py-2 rounded hover:underline">Login</a>
            </li>
            <li>
              <a href="/register" className="bg-primary text-secondary px-4 py-2 rounded border">Register</a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default DesktopNav;
