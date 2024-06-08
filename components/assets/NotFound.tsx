import React from "react";

interface NotFoundProps {
  message: string;
}

const NotFound: React.FC<NotFoundProps> = ({ message }) => {
  return (
    <>
      <svg
        fill="none"
        viewBox="-80 0 369 271"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-xs mx-auto h-full"
      >
        <path
          clipRule="evenodd"
          d="M108.36 2.48l105.7 185.47H2.66L108.35 2.48z"
          // fill="#000"
          fillRule="evenodd"
          // stroke="#333"
          strokeDasharray="4 4"
          strokeWidth="2"
          className="fill-base-content stroke-base-content"
        ></path>
        <g filter="url(#filter0_d)">
          <ellipse
            cx="182.68"
            cy="156.48"
            //   fill="#000"
            className="fill-primary stroke-primary"
            rx="74.32"
            ry="74.52"
          ></ellipse>
          <path
            d="M256.5 156.48c0 40.88-33.05 74.02-73.82 74.02-40.77 0-73.83-33.14-73.83-74.02 0-40.87 33.06-74.01 73.83-74.01 40.77 0 73.82 33.14 73.82 74.01z"
            stroke="#333"
          ></path>
        </g>
        <mask
          height="150"
          id="a"
          maskUnits="userSpaceOnUse"
          width="149"
          x="108"
          y="81"
        >
          <ellipse
            cx="182.68"
            cy="156.48"
            rx="74.32"
            ry="74.52"
            className="fill-primary"
          ></ellipse>
        </mask>
        <g mask="url(#a)">
          <path
            clipRule="evenodd"
            d="M108.36 2.48l105.7 185.47H2.66L108.35 2.48z"
            fill="#fff"
            fillRule="evenodd"
          ></path>
        </g>
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="213.03"
            id="filter0_d"
            width="212.65"
            x="76.35"
            y="57.97"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            ></feColorMatrix>
            <feOffset dy="8"></feOffset>
            <feGaussianBlur stdDeviation="16"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            ></feBlend>
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            ></feBlend>
          </filter>
        </defs>
      </svg>

      <div className="text-lg text-center">
        {message ? message : "Page not found"}
      </div>
    </>
  );
};

export default NotFound;
