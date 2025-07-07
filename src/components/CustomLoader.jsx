// src/components/Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-white-500 px-2"></div>
    </div>
  );
};

export default Loader;
