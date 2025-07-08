import React, { useState } from 'react';
import type { Notification } from './NotificationsDropdown';

const NotificationMenu = ({
  onDelete,
  onBlock,
  onSave,
  onReply,
}: {
  onDelete: () => void;
  onBlock: () => void;
  onSave: () => void;
  onReply: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuOptions = [
    {
      label: "Reply",
      icon: "↩️",
      action: onReply,
    },
    {
      label: "Save",
      icon: "💾",
      action: onSave,
    },
    {
      label: "Block User",
      icon: "🚫",
      action: onBlock,
      danger: true,
    },
    {
      label: "Delete",
      icon: "🗑️",
      action: onDelete,
      danger: true,
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1 text-gray-400 hover:text-white focus:outline-none"
        aria-label="Notification menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#2A2748] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {menuOptions.map((option) => (
              <button
                key={option.label}
                onClick={(e) => {
                  e.stopPropagation();
                  option.action();
                  setIsOpen(false);
                }}
                className={`flex w-full items-center px-4 py-2 text-sm ${
                  option.danger
                    ? "text-red-400 hover:bg-red-500/10"
                    : "text-gray-200 hover:bg-white/10"
                }`}
              >
                <span className="mr-2">{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = () => console.log(`Deleted notification from ${notification.sender}`);
  const handleBlock = () => console.log(`Blocked ${notification.sender}`);
  const handleSave = () => console.log(`Saved notification from ${notification.sender}`);
  const handleReply = () => console.log(`Replying to ${notification.sender}`);

  const renderAvatar = () => {
    if (notification.senderAvatar) {
      return (
        <img
          src={notification.senderAvatar}
          alt={notification.sender}
          className="w-10 h-10 rounded-full object-cover"
        />
      );
    }

    const initial = notification.sender.charAt(0).toUpperCase();
    const bgColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500'];
    const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];

    return (
      <div className={`w-10 h-10 rounded-full ${randomColor} flex items-center justify-center text-white font-bold`}>
        {initial}
      </div>
    );
  };

  const renderContent = () => {
    switch (notification.type) {
      case 'crypto':
        return (
          <>
            <p className="text-[#4f4f7e]">{notification.content}</p>
            <div className="flex items-center justify-between mt-1">
              <span className="font-medium text-[#50E3C2]">
                {notification.cryptoAmount} 
                <span className='text-gray-700 ml-2'>{notification.cryptoType}</span>
              </span>
              <a href="#" className='text-[#70B2FF] me-3 underline'>open my wallet</a>
            </div>
          </>
        );

      case 'news':
        return (
          <>
            <p className="text-[#4f4f7e]">{notification.content}</p>
            <div className="flex justify-between">
              <span className={`mt-1 font-medium ${
                notification.changePercentage?.includes('+')
                  ? 'text-[#50E3C2]'
                  : 'text-red-500'
              }`}>
                {notification.changePercentage}
              </span>
              <span className='text-[#70B2FF] me-3'>Trade now</span>
            </div>
          </>
        );

      default:
        return <p className="text-[#4f4f7e]">{notification.content}</p>;
    }
  };

  return (
    <div 
      className="p-3 pl-7 hover:bg-[#17153A] group duration-300 transition-colors relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Menu button (only shows on hover) */}
      {isHovered && (
        <div className="absolute top-3 right-3">
          <NotificationMenu
            onDelete={handleDelete}
            onBlock={handleBlock}
            onSave={handleSave}
            onReply={handleReply}
          />
        </div>
      )}

      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {renderAvatar()}
        </div>
        <div className="flex-1">
          <div className="flex justify-start gap-4">
            <h4 className="font-semibold max-[370px]:text-[14.4px] text-[#8786AB] group-hover:text-[#B1AFCD]">
              {notification.sender}
            </h4>
            <div className="mt-1 text-xs">
              <span className="group-hover:text-[#75749C] text-gray-600">
                {notification.type === 'message' && 'Sent you a message'}
                {notification.type === 'crypto' && 'Sent you a coin'}
                {notification.type === 'news' && 'News'}
              </span>
            </div>
          </div>

          <div className="mt-2 text-sm">
            {renderContent()}
          </div>
          <span className="text-xs text-[#4f4f7e]">{notification.timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;