"use client";
import NextTopLoader from "nextjs-toploader";

const ProgressBarI = () => {
  return (
    <>
      <NextTopLoader
        height={2}
        showSpinner={false}
        shadow="false"
        easing="ease"
        color="#75cd7d"
      />
    </>
  );
};

export default ProgressBarI;
