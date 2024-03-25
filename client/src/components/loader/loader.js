import React from "react";

const Loader = ({ size = 70, color = "#ff0000" }) => {
  return (
    <svg viewBox="0 0 100 100">
      <defs>
        <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="0" result="offsetblur" />
          <feFlood floodColor="#000000" floodOpacity="0.4" />
          <feComposite in2="offsetblur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle
        id="loader"
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        stroke="#a3a3a3"
        strokeWidth="10"
        strokeDasharray="251.32"
        strokeDashoffset="251.32"
        transform="rotate(-90, 50, 50)"
        filter="url(#drop-shadow)"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="-90 50 50"
          to="270 50 50"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="251.32;0"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default Loader;
