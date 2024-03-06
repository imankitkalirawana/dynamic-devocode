import Logs from "@/components/logs/Logs";
import React from "react";
import API_BASE_URL from "@/utils/config";

const Page = () => {
  return (
    <>
      <div className="col-span-full lg:col-span-9">
        <Logs />
      </div>
    </>
  );
};

export default Page;
