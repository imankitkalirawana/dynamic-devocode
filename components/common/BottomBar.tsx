import dynamic from "next/dynamic";
import Link from "next/link";

const BottomBar = () => {
  return (
    <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-base-100/70 border border-base-200 rounded-full bottom-4 left-1/2 backdrop-blur-lg">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <Link
          href={"/"}
          data-tooltip-target="tooltip-home"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-base-200/70 group transition-all tooltip"
          data-tip="Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6 mb-1 text-base-content group-hover:text-primary transition-all"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
              clipRule="evenodd"
            />
          </svg>

          <span className="sr-only">Home</span>
        </Link>
        <Link
          href={"/dashboard"}
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-base-200/70 group transition-all tooltip"
          data-tip="Dashboard"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 mb-1 text-base-content group-hover:text-primary transition-all"
          >
            <path
              fillRule="evenodd"
              d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Dashboard</span>
        </Link>
        <div className="flex items-center justify-center">
          <Link
            href={""}
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 font-medium bg-primary rounded-full group focus:ring-4 focus:ring-primary/50 focus:outline-none transition-all tooltip"
            data-tip="Create"
          >
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </Link>
          <span className="sr-only">Create</span>
        </div>
        <Link
          href={"/settings"}
          data-tooltip-target="tooltip-settings"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-base-200/70 group transition-all tooltip"
          data-tip="Settings"
        >
          <svg
            className="w-5 h-5 mb-1 text-base-content group-hover:text-primary transition-all"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
            />
          </svg>
          <span className="sr-only">Settings</span>
        </Link>

        <Link
          href={"/settings#profile"}
          data-tooltip-target="tooltip-profile"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-base-200/70 group transition-all tooltip"
          data-tip="Profile"
        >
          <svg
            className="w-5 h-5 mb-1 text-base-content group-hover:text-primary transition-all"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <span className="sr-only">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(BottomBar), { ssr: false });
