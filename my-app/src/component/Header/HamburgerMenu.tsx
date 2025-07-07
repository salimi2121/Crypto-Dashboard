import React from "react";

export interface HamburgerMenuProps {
  onClick: () => void;
  isOpen: boolean;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onClick, isOpen }) => {
  return (
    <button 
      onClick={onClick}
      className="p-2 pl-0 text-gray-500 rounded-lg focus:outline-none"
      aria-expanded={isOpen}
      aria-label="منوی همبرگر"
    >
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isOpen ? (
          <path d="M6 18L18 6M6 6l12 12" />
        ) : (
          <g>
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
          </g>
        )}
      </svg>
    </button>
  );
};

export default HamburgerMenu;