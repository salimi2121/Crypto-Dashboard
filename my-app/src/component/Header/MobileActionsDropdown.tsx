import { useState } from "react";
import { FiSearch } from "react-icons/fi"; 


interface MobileActionsDropdownProps {
  onSearchClick: () => void;
  onProfileClick: () => void;
  onNotificationsClick: () => void;
  unreadCount: number;
  userAvatar: string;
}

const MobileActionsDropdown: React.FC<MobileActionsDropdownProps> = ({
  onSearchClick,
  onProfileClick,
  userAvatar,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-[1281px]:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="py-2 rounded-full text-white"
        aria-label="منوی اقدامات"
        aria-expanded={isOpen}
      >
         <img 
                src={userAvatar} 
                className="w-6 h-6 rounded-full mr-2" 
                alt="پروفایل کاربر"
              />
        
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1B1942] rounded-md shadow-lg z-50 border border-gray-600">
          <div className="p-2 space-y-2">
            <button 
              onClick={() => {
                onSearchClick();
                setIsOpen(false);
              }}
              className="flex items-center w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 rounded"
            >
              <FiSearch className="mr-2" />
              جستجو
            </button>
            
            <button 
              onClick={() => {
                onProfileClick();
                setIsOpen(false);
              }}
              className="flex items-center w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 rounded"
            >
             
              پروفایل
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileActionsDropdown;