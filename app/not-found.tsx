"use client";

import React, { useState } from "react";
import Link from "next/link";
import classNames from "classnames";

const NotFound = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-8xl font-bold animate-bounce">404</h1>
      <p className="text-2xl mb-6">Oops! This page doesn&apos;t exist.</p>

      {/* Interactive Button */}
      <Link href="/" passHref>
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={classNames(
            "px-6 py-3 font-semibold text-lg rounded-lg bg-indigo-600 transition-transform duration-200 ease-in-out",
            { "bg-pink-600 scale-110": hover }
          )}
        >
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
