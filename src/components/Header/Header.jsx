import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from "react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData); // Get userData from Redux
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To manage dropdown state

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Images", slug: "/all-posts", active: authStatus },
    { name: "Add Image", slug: "/add-post", active: authStatus },
    { name: "Categories", slug: "/categories", active: authStatus },
  ];

  return (
    <header className="bg-[#222831] shadow-lg fixed top-0 w-full z-40" style={{ fontFamily: '"Playwrite IT Moderna", serif' }}>
      <Container>
        <nav className="flex items-center justify-between relative">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/">
              <Logo />
            </Link>
            <button
              className="md:hidden text-[#EEEEEE] p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            {/* </div> */}
          </div>

          {/* Navigation Links */}
          <ul
            className={`absolute top-full left-0 w-full bg-[#222831] md:static md:flex md:space-x-4 md:bg-transparent transition-transform transform ${isMenuOpen ? "block" : "hidden"
              }`}
          >
            <li className="md:hidden flex justify-end">
              <button
                className="text-[#EEEEEE] p-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>

            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className="flex">
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setIsMenuOpen(false);
                      }}
                      className="relative inline-flex items-center justify-center p-3 mb-2 mr-2 overflow-hidden text-lg font-medium text-white bg-transparent rounded-lg group transform hover:bg-gray-600 transition-all duration-300 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-gray-700 dark:focus:ring-gray-800 dark:bg-transparent dark:hover:bg-gray-600"
                    >
                      <span className="relative px-5 py-0.5 transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-opacity-0">
                        {item.name}
                      </span>
                    </button>
                  </li>
                )
            )}
          </ul>

          {/* User Profile Dropdown */}
          {authStatus && userData && (
            <div className="relative">

              <button
                className="relative inline-flex items-center justify-center p-0.5 mb-1.5  overflow-hidden text-lg font-medium text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-violet-800 dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="relative px-3.5 py-2 transition-all ease-in duration-75 bg-white dark:bg-[#083c69] rounded-full group-hover:bg-opacity-0">
                  {userData.name.charAt(0).toUpperCase()}
                </span>
              </button>

              {isDropdownOpen && (
                <ul className="absolute right-0 mt-1 w-48 bg-white text-black rounded-lg shadow-lg z-10">
                  <li className="p-2 font-semibold text-start hover:bg-slate-400 w-full">
                    {userData.name} {/* Display full name */}
                  </li>
                  <li className="p-2 font-semibold text-gray-600 text-start hover:bg-slate-400">
                    {userData.email} {/* Display user's email */}
                  </li>
                  <li className="border-t border-gray-600">
                    <LogoutBtn />
                  </li>
                </ul>
              )}
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
