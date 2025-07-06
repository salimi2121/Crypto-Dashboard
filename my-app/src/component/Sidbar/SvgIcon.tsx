import React from "react";

interface SvgIconProps {
  src: string;
  className?: string;
  width?: number;
  height?: number;
}

const SvgIcon: React.FC<SvgIconProps> = ({ 
  src, 
  className = "", 
  width = 20, 
  height = 20 
}) => {
  return (
    <img 
      src={src} 
      alt="icon" 
      className={`inline-block ${className}`} 
      width={width} 
      height={height}
    />
  );
};

export default SvgIcon;