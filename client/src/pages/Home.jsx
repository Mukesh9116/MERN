import React from "react";
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiJavascript } from "react-icons/si";

export const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white px-6 py-12"
      style={{
        background: "linear-gradient(90deg, #0700b8 0%, #00ff88 100%)",
      }}
    >
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
        Welcome to <span className="text-yellow-300">Home Page</span>
      </h1>
      <p className="text-gray-100 mb-10 text-lg">
        An Insightful Guide on <span className="text-cyan-200 font-semibold">Full Stack Development</span>
      </p>

      {/* Circle Layout */}
      <div className="relative w-80 h-80 rounded-full flex items-center justify-center border-4 border-white/50 shadow-2xl">
        {/* Center Avatar */}
        <div className="w-24 h-24 rounded-full bg-black/40 flex items-center justify-center text-4xl font-bold border border-white/30">
          👨‍💻
        </div>

        {/* Tech Icons around circle */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <FaHtml5 className="text-orange-400 text-4xl drop-shadow" />
        </div>
        <div className="absolute top-12 -right-6">
          <FaCss3Alt className="text-blue-400 text-4xl drop-shadow" />
        </div>
        <div className="absolute bottom-12 -right-6">
          <SiJavascript className="text-yellow-300 text-4xl drop-shadow" />
        </div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          <FaReact className="text-cyan-300 text-4xl animate-spin-slow drop-shadow" />
        </div>
        <div className="absolute bottom-12 -left-6">
          <FaNodeJs className="text-green-400 text-4xl drop-shadow" />
        </div>
        <div className="absolute top-12 -left-6">
          <FaPython className="text-yellow-200 text-4xl drop-shadow" />
        </div>
      </div>
    </div>
  );
};
