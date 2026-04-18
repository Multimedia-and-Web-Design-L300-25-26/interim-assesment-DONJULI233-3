import React from 'react';

interface LogoProps {
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ height = 28, className = '' }) => (
  <div className={`flex items-center ${className}`}>
    <svg
      width={height}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="#0052FF" />
      <path
        d="M20 6C12.268 6 6 12.268 6 20s6.268 14 14 14 14-6.268 14-14S27.732 6 20 6zm-3.6 16.8a3.6 3.6 0 110-7.2h7.2a3.6 3.6 0 110 7.2h-7.2z"
        fill="white"
      />
    </svg>
    <span className="ml-2 text-xl font-bold text-gray-900">CryptoApp</span>
  </div>
);

export default Logo;
