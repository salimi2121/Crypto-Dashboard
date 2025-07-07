import React from "react";
import logoicon from "../../assets/sidebar/Logo.svg";

interface LogoTitleProps {
  className?: string;
  logoSize?: "sm" | "md" | "lg";
}

const LogoTitle: React.FC<LogoTitleProps> = ({ 
  className = "", 
  logoSize = "md" 
}) => {
  // تعیین سایز لوگو بر اساس prop
  const getLogoSize = () => {
    switch (logoSize) {
      case "sm":
        return "w-8";
      case "md":
        return "w-10";
      case "lg":
        return "w-14";
      default:
        return "w-10";
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoicon} 
        className={`${getLogoSize()} pt-4 transition-all duration-200`} 
        alt="ReceTok Logo" 
      />
      <h1 className="text-white text-xl ml-2 font-medium">
        Rece<span className="text-gray-400">tok</span>
      </h1>
    </div>
  );
};

export default LogoTitle;