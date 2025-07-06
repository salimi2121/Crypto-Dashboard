import { FiSearch } from "react-icons/fi";
import menuicon from "../../assets/header/Menu icn.svg";
import { IoMdArrowDropdown } from "react-icons/io";
import NotificationsDropdown from "../Notification/NotificationsDropdown";

interface HeaderProps {
    user: {
        name: string;
        avatarUrl: string;
    };
    unreadNotifications: number; 
}

const Header: React.FC<HeaderProps> = ({ user, unreadNotifications }) => {
    return (
        <header className="shadow-sm p-4 flex items-start ">
            <div className="flex justify-between items-start w-full">
                <div className="flex-1"></div>
                <div className="w-[52%]">
                    <h1 className="text-white text-3xl font-semibold">Dashboard</h1>
                    <p className="text-[#5B5A99] text-sm">With all of the styling tool options available in today’s market</p>
                </div>
                {/* منوی سمت راست */}
                <div className="flex items-center space-x-6">
                    {/* بخش جستجو */}
                    <div className="flex w-10 cursor-pointer">
                        <FiSearch className="top-1/2 transform -translate-y-2/5 text-[#5B5A99] text-3xl" />
                    </div>
                    <div className="">
                        <button className="me-3">
                            <img src={menuicon} alt="" />
                        </button>
                    </div>

                    {/*اعلان‌ها */}
                     <NotificationsDropdown unreadCount={unreadNotifications} />
                   

                    {/* پروفایل کاربر */}
                    <div className="flex items-center space-x-2  text-[#5B5A99] cursor-pointer">
                        <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className="w-8 h-8 rounded-md"
                        />
                        <div className="flex items-center justify-center">

                            <span className="text-xs text-[#5B5A99] font-medium pb-1">{user.name}</span>
                            <IoMdArrowDropdown />
                        </div>
                    </div>
                </div>
            </div>

        </header>
    );
};

export default Header;