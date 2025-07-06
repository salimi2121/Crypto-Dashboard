import React from 'react';
import type { Notification } from './NotificationsDropdown';


const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {

  const renderAvatar = () => {
    // اگر آواتار وجود داشت از تصویر استفاده می‌کنیم
    if (notification.senderAvatar) {
      return (
        <img
          src={notification.senderAvatar}
          alt={notification.sender}
          className="w-10 h-10 rounded-full object-cover"
        />
      );
    }

    // در غیر این صورت حرف اول نام را نمایش می‌دهیم
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
            <div className="flex justify-between ">
              <span className={`mt-1 font-medium ${notification.changePercentage?.includes('+')
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
    <div className="p-3 pl-7 hover:bg-[#17153A] group duration-300 transition-colors">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {renderAvatar()}
        </div>
        <div className="flex-1">
          <div className="flex justify-start gap-4">
            <h4 className="font-semibold text-[#8786AB] group-hover:text-[#B1AFCD]">{notification.sender}</h4>
            <div className="mt-1 text-xs">
              <span className="group-hover:text-[#75749C] text-gray-600">
                {notification.type === 'message' && 'Sent you a message'}
                {notification.type === 'crypto' && 'Sent you a can'}
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