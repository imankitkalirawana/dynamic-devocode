import React from "react";

const PSkeleton = () => {
  return (
    <div className="col-span-full lg:col-span-9">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-4 w-full">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-full max-w-96"></div>
          </div>
        </div>
        <div className="skeleton h-12 md:max-w-[49%]"></div>
        <div className="skeleton h-28"></div>
        <div className="flex gap-4 max-w-48">
          <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
          <div className="skeleton h-10 w-full"></div>
        </div>
        <div className="skeleton h-28"></div>

        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-4 w-full">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-full max-w-96"></div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
        </div>
        <div className="flex gap-4">
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PSkeleton;
