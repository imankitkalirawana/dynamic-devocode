import React from "react";

interface NotFoundProps {
  message: string;
}

const NotFound: React.FC<NotFoundProps> = ({ message }) => {
  return (
    <div className="col-span-12 md:col-span-8 lg:col-span-4 col-start-1 md:col-start-3 lg:col-start-5">
      {/* <svg
        fill="none"
        viewBox="-80 0 369 271"
        // width="360"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-xs mx-auto"
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
      </svg> */}

      <div className="relative w-[300px] mb-24 mt-10 mx-auto">
        <div className="w-0 h-0 border-l-[100px] border-l-transparent border-b-[170px] border-base-content border-r-[100px] border-r-transparent transition-all"></div>
        <div className="absolute bottom-[-66px] right-[40px] w-[150px] h-[150px] bg-primary rounded-full mix-blend-screen transition-all"></div>
      </div>
      <div className="text-lg text-center">
        {message ? message : "Page not found"}
      </div>
    </div>
  );
};

export default NotFound;
