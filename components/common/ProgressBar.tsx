"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressBarI = () => {
  return (
    <>
      <ProgressBar
        height="4px"
        // color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressBarI;
