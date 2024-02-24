import React from "react";

const OSkeleton = () => {
  return (
    <div className="col-span-full lg:col-span-9">
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <div className="skeleton h-6 w-[40%]"></div>
          <div className="skeleton h-6 w-[20%]"></div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <div className="skeleton h-6 w-[30%]"></div>
          <div className="skeleton h-6 w-[20%]"></div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <div className="skeleton h-6 w-[40%]"></div>
          <div className="skeleton h-6 w-[30%]"></div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <div className="skeleton h-6 w-[40%]"></div>
          <div className="skeleton h-6 w-[20%]"></div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <div className="skeleton h-6 w-[30%]"></div>
          <div className="skeleton h-6 w-[20%]"></div>
        </div>
      </div>
    </div>
  );
};

export default OSkeleton;
