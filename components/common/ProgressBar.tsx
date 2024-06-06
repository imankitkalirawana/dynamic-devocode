"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import NextTopLoader from "nextjs-toploader";

const ProgressBarI = () => {
  return (
    <>
      {/* <ProgressBar
        height="4px"
        // color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
      /> */}
      <NextTopLoader />
    </>
  );
};

export default ProgressBarI;
