import React from "react";
interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${className}`}>
    <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
      <h3 className="text-md font-medium text-black">{title}</h3>
    </div>
    <div className="p-4">{children}</div>
  </div>
);

export default Card;
