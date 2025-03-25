"use client";

import React from 'react';

const Background = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen relative bg-[#010A13]">
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Background;