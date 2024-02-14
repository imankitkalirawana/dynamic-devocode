import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="mt-24 max-w-7xl m-auto grid grid-cols-12 gap-4 gap-y-8 p-8">
      {/* subjects */}
      <div className="card bg-base-200 col-span-12 md:col-span-8 md:col-start-3 lg:col-span-6">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h2>Subjects</h2>
            <Link
              href={"/resources/subjects"}
              className="btn btn-link link link-primary"
            >
              View all
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
          <div className="card grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="skeleton w-40 h-40"></div>
                ))
              : subjects.slice(0, 3).map((subject) => ( */}
            <Link
              href={`/resources/subjects/`}
              className="stat bg-base-100 card aspect-square flex justify-center items-center hover:bg-base-300 transition-all"
            >
              <div className="stat-value text-2xl">CSE110</div>
            </Link>
            {/* ))} */}
          </div>
        </div>
      </div>
      {/* announcements */}
      <div className="card bg-base-200 col-span-12 md:col-span-8 md:col-start-3 lg:col-span-6">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h2>Announcements</h2>
            <Link
              href={"/resources/announcements"}
              className="btn btn-link link link-primary"
            >
              View all
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
          <div className="overflow-hidden mt-4">
            {/* {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="skeleton w-full h-10 my-2"></div>
              ))
            ) : ( */}
            <ul className="divide-y divide-base-200 gap-2 flex flex-col">
              {/* {announcements.slice(0, 3).map((announcement) => ( */}
              <Link
                href={`/announcements/`}
                className="p-4 bg-base-100 card hover:bg-base-300 transition-all"
              >
                <div className="flex">
                  <h3 className="text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </h3>
                </div>
              </Link>
              {/* ))} */}
            </ul>
            {/* )} */}
          </div>
        </div>
      </div>
      {/* Dl's */}
      <div className="card col-span-12 md:col-span-8 md:col-start-3 lg:col-span-6">
        <div className="flex justify-between items-center">
          <h2 className="pl-8">Upcoming DL's</h2>
          <button className="btn btn-link link link-primary">
            Register
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
        <div className="stats stats-vertical lg:stats-horizontal">
          <div className="stat">
            <div className="stat-value">Time</div>
            <div className="stat-title">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-value">Location</div>
            <div className="stat-title">SDMA</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
