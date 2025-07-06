import React, { useState, useRef, useEffect } from 'react';
import NotificationItem from './NotificationItem';
import Haleimage from "../../assets/header/2.png";
import Danniimage from "../../assets/header/3.png"
import { IoMdNotifications } from "react-icons/io";


export type NotificationType = 'message' | 'crypto' | 'news';

export interface Notification {
  id: string;
  type: NotificationType;
  sender: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  cryptoAmount?: string;
  cryptoType?: string;
  changePercentage?: string;
}

const NotificationsDropdown: React.FC<{ unreadCount: number }> = ({ unreadCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'message',
      sender: 'Clifford Hale',
      content: 'Hallo bro anak wes piro saiki? wes kuliah urung?…',
      timestamp: '2 hours ago',
      senderAvatar: Haleimage
    },
    {
      id: '2',
      type: 'crypto',
      sender: 'Lottie Marsh',
      content: 'Bro iki nggo tuku es anakmu yo, ojo dinggo judi neh!!',
      timestamp: '3 hours ago',
      cryptoAmount: '+380.234',
      cryptoType: 'LTC'
    },
    {
      id: '3',
      type: 'news',
      sender: 'BTC News',
      content: 'Bitcoin baru saja menguat 5 poin kalau tidak salah lho',
      timestamp: '3 hours ago',
      changePercentage: '+39.69%'
    },
    {
      id: '4',
      type: 'message',
      sender: 'Danny Jacobs',
      content: 'Besok jangan lupa mabar minecraft',
      timestamp: '2 hours ago',
      senderAvatar: Danniimage
    }
  ]);

  // بستن دراپ‌داون هنگام کلیک در خارج از آن
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);


  return (
    <div className="relative">
      {/* دکمه آیکن نوتیفیکیشن با استایل مشابه هدر */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex bg-gradient-to-br from-[#FF409A] to-[#C438EF] cursor-pointer rounded-3xl px-2 py-1 "
      >
        <IoMdNotifications className="text-white text-md" />
        {unreadCount > 0 && (
          <span className="text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* دراپ‌داون نوتیفیکیشن‌ها */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-[28rem] bg-[#1B1942] rounded-lg shadow-xl pt-2 z-50"
        >

          {/* هدر */}
          <div className="p-4 pl-7">
            <h3 className="text-md text-gray-100">NOTIFICATIONS</h3>
          </div>

          {/* لیست نوتیفیکیشن‌ها */}
          <div className="max-h-[28rem] overflow-y-auto">
            {notifications.map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>

          {/* فوتر */}
          <div className="p-3 text-center ">
            <button className="text-[#70B2FF] hover:text-[#38608f] transition-all duration-700 font-medium text-sm">
              See All
            </button>
          </div>

        </div>
      )}
    </div>

  );
};

export default NotificationsDropdown;