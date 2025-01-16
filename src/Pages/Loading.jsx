import React from "react";

const Loading = () => {
  return (
    <div class="loader-container flex items-center justify-center h-screen md:w-[80vw] w-screen ">
      <svg viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="8" fill="#3b82f6">
          <animate
            attributeName="cy"
            values="15;7;15;15"
            dur="1.6s"
            keyTimes="0;0.3;0.6;1"
            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
            calcMode="spline"
            repeatCount="indefinite"
            begin="0s"
          />
          <animate
            attributeName="ry"
            values="8;8;6;8"
            dur="1.6s"
            keyTimes="0;0.3;0.6;1"
            repeatCount="indefinite"
            begin="0s"
          />
          <animate
            attributeName="rx"
            values="8;8;9;8"
            dur="1.6s"
            keyTimes="0;0.3;0.6;1"
            repeatCount="indefinite"
            begin="0s"
          />
          <animate
            attributeName="fill"
            values="#3b82f6;#6366f1;#8b5cf6;#3b82f6"
            dur="1.6s"
            repeatCount="indefinite"
            begin="0s"
          />
        </circle>

        <circle cx="45" cy="15" r="8" fill="#3b82f6">
          <animate
            attributeName="cy"
            values="15;7;15;15"
            dur="1.6s"
            keyTimes="0;0.3;0.6;1"
            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
            calcMode="spline"
            repeatCount="indefinite"
            begin="0.4s"
          />
          <animate
            attributeName="ry"
            values="8;8;6;8"
            dur="1.6s"
            keyTimes="0;0.3;0.6;1"
            repeatCount="indefinite"
            begin="0.4s"
          />
          <animate
            attributeName="rx"
            values="8;8;9;8"
            dur="1.6s"
            keyTimes="0;0.3;0.6;1"
            repeatCount="indefinite"
            begin="0.4s"
          />
          <animate
            attributeName="fill"
            values="#3b82f6;#6366f1;#8b5cf6;#3b82f6"
            dur="1.6s"
            repeatCount="indefinite"
            begin="0.4s"
          />
        </circle>

        <circle cx="75" cy="15" r="8" fill="#3b82f6">
          <animate
            attributeName="cy"
            values="15;7;15;15"
            dur="1.6s"
            keyTimes="0;0.3;0.6;1"
            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
            calcMode="spline"
            repeatCount="indefinite"
            begin="0.8s"
          />
          <animate
            attributeName="ry"
            values="8;8;6;8"
            dur="1.6s"
            keyTimes="0;0.3;0.6;1"
            repeatCount="indefinite"
            begin="0.8s"
          />
          <animate
            attributeName="rx"
            values="8;8;9;8"
            dur="1.6s"
            keyTimes="0;0.3;0.6;1"
            repeatCount="indefinite"
            begin="0.8s"
          />
          <animate
            attributeName="fill"
            values="#3b82f6;#6366f1;#8b5cf6;#3b82f6"
            dur="1.6s"
            repeatCount="indefinite"
            begin="0.8s"
          />
        </circle>
      </svg>
    </div>
  );
};

export default Loading;
