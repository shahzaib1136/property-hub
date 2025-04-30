import React from "react";
import Link from "next/link";

interface PropertyActionCardProps {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  bgColor: string;
  buttonColor: string;
  textColor?: string;
}

const PropertyActionCard: React.FC<PropertyActionCardProps> = ({
  title,
  description,
  linkText,
  linkHref,
  bgColor,
  buttonColor,
  textColor = "text-grey-800",
}) => {
  return (
    <div className={`p-6 rounded-lg shadow-md ${bgColor}`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{title}</h2>
      <p className="mt-2 mb-4">{description}</p>
      <Link
        href={linkHref}
        className={`inline-block ${buttonColor} text-white rounded-lg px-4 py-2 hover:bg-opacity-80`}
      >
        {linkText}
      </Link>
    </div>
  );
};

export default PropertyActionCard;
