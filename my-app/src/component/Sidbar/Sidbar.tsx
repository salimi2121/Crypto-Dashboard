import React from "react";
import SvgIcon from "./SvgIcon";
import { Link, useLocation } from "react-router-dom";
import ActiveStateMark from "../../assets/sidebar/ActiveStateMark.png";
import dashboard from "../../assets/sidebar/dashboard.svg";
import Wallet from "../../assets/sidebar/Wallet.svg";
import Message from "../../assets/sidebar/Message.svg";
import Trade from "../../assets/sidebar/Trade.svg";
import Account from "../../assets/sidebar/Account.svg";
import LogoTitle from "../Header/LogoTitle";


// انواع TypeScript برای آیتم‌های منو
interface MenuItem {
  title: string;
  icon: string;
  path: string;
  hasNotification?: boolean;
}

interface SidebarProps {
  isMobile: boolean;
  mobileMenuOpen: boolean;
  closeMobileMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, mobileMenuOpen, closeMobileMenu }) => {
  const location = useLocation();
  const hasNewMessages = true;
  
  // آیتم‌های منو با مسیرهای SVG
  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: dashboard,
      path: "/dashboard"
    },
    {
      title: "Wallet",
      icon: Wallet,
      path: "/wallet"

    },
    {
      title: "Messages",
      icon: Message,
      path: "/messages",
      hasNotification: hasNewMessages // اضافه کردن وضعیت نوتیفیکیشن
    },
    {
      title: "Trade",
      icon: Trade,
      path: "/trade"
    },
    {
      title: "Account Setting",
      icon: Account,
      path: "/settings"
    },
  ];

  return (
    <>
   

      {/* سایدبار اصلی برای دسکتاپ */}
        <div
        className={`w-64 bg-[#1B1942] text-white h-screen p-4 fixed left-0 top-0 transition-all duration-300 ${
          isMobile ? "hidden" : "block"
        }`}
      >
        <div className="flex items-center justify-start mb-32 p-2">
          <LogoTitle logoSize="lg" />
        </div>

        <nav>
          <ul className="space-y-7">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.title} className="relative">
                  {isActive && (
                    <SvgIcon
                      src={ActiveStateMark}
                      width={16}
                      height={16}
                      className="absolute -left-3 top-1"
                    />
                  )}
                  <Link
                    to={item.path}
                    className={`flex items-center p-2 pl-6 hover:bg-gray-800 rounded-lg ${
                      isActive ? "text-blue-500" : "text-gray-500"
                    }`}
                  >
                    <SvgIcon
                      src={item.icon}
                      className={`mr-3 ${isActive ? "filter-blue" : ""}`}
                      width={26}
                      height={26}
                    />
                    <span className="flex-grow">{item.title}</span>
                    {item.hasNotification && (
                      <div className="w-2 h-2 bg-pink-500 rounded-full me-2 mt-1"></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>


      {/* منوی موبایل */}
     {isMobile && (
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-20"
            onClick={closeMobileMenu}
          />
          <div
            className={`fixed left-0 top-0 bottom-0 w-64 bg-[#1B1942] text-white p-4 z-50 transform transition-transform duration-300 ${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-start mb-32 p-2">
              <LogoTitle logoSize="lg" />
            </div>

            <nav>
              <ul className="space-y-7">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.title} className="relative">
                      {isActive && (
                        <SvgIcon
                          src={ActiveStateMark}
                          width={16}
                          height={16}
                          className="absolute -left-3 top-1"
                        />
                      )}
                      <Link
                        to={item.path}
                        className={`flex items-center p-2 pl-6 hover:bg-gray-800 rounded-lg ${
                          isActive ? "text-blue-500" : "text-gray-500"
                        }`}
                        onClick={closeMobileMenu}
                      >
                        <SvgIcon
                          src={item.icon}
                          className={`mr-3 ${isActive ? "filter-blue" : ""}`}
                          width={26}
                          height={26}
                        />
                        <span className="flex-grow">{item.title}</span>
                        {item.hasNotification && (
                          <div className="w-2 h-2 bg-pink-500 rounded-full me-2 mt-1"></div>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};


export default Sidebar;


