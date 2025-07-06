import React from "react";
import SvgIcon from "./SvgIcon";
import { Link, useLocation } from "react-router-dom";
import logoicon from "../../assets/sidebar/Logo.svg";

// انواع TypeScript برای آیتم‌های منو
interface MenuItem {
  title: string;
  icon: string;
  path: string;
  hasNotification?: boolean;
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [hasNewMessages, setHasNewMessages] = React.useState(true);
  // آیتم‌های منو با مسیرهای SVG
  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: "/src/assets/sidebar/dashboard.svg",
      path: "/dashboard"
    },
    {
      title: "Wallet",
      icon: "/src/assets/sidebar/Wallet.svg",
      path: "/wallet"

    },
    {
      title: "Messages",
      icon: "/src/assets/sidebar/Message.svg",
      path: "/messages",
      hasNotification: hasNewMessages // اضافه کردن وضعیت نوتیفیکیشن
    },
    {
      title: "Trade",
      icon: "/src/assets/sidebar/Trade.svg",
      path: "/trade"
    },
    {
      title: "Account Setting",
      icon: "/src/assets/sidebar/Account.svg",
      path: "/settings"
    },
  ];



  return (
    <div className="w-64 bg-[#1B1942] text-white h-screen p-4 fixed left-0 top-0">
      <div className="flex items-center justify-start mb-32 p-2">
        <img src={logoicon} className="w-14 pt-4" alt="" />
        <h1 className="text-white text-xl">
          Rece<span className="text-gray-600">tok</span>
        </h1>
      </div>

      <nav>
        <ul className="space-y-7">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.title} className="relative">
                {isActive && (
                  <SvgIcon
                    src="/src/assets/sidebar/ActiveStateMark.png"
                    width={16}
                    height={16}
                    className="absolute -left-3 top-1"
                  />
                )}
                <Link
                  to={item.path}
                  className={`flex items-center p-2 pl-6 hover:bg-gray-800 rounded-lg ${isActive ? 'text-blue-500 ' : 'text-gray-500'}`}
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
  );
};


export default Sidebar;


