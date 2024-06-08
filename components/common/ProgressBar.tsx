"use client";
import NextTopLoader from "nextjs-toploader";

const ProgressBarI = () => {
  return (
    <>
      <NextTopLoader
        height={1}
        showSpinner={false}
        shadow="false"
        easing="ease"
      />
    </>
  );
};

export default ProgressBarI;
