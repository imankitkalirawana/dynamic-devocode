import { Button } from "@nextui-org/react";
import dynamic from "next/dynamic";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative isolate px-6 lg:px-8 mt-12">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-secondary to-primary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl py-20">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-content ring-1 ring-base-300/70">
            Contribute to devocode and help others to grow.{"  "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdFBSjoY5HW4QeUwOPn2gBruzUwW4utGR1TAGIXa4UoQwmKgg/viewform?usp=send_form"
              target="_blank"
              className="font-semibold text-primary"
            >
              <span className="absolute inset-0" aria-hidden="true" />
              Contribute <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to devocode
          </h1>
          <p className="mt-6 text-lg leading-8 text-content">
            A platform for developers to share and grow their knowledge.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {/* <Link href="/resources" className="btn btn-primary">
              Explore Resources
            </Link> */}
            <Button variant="solid" as={Link} color="primary" href="/resources">
              Explore Resources
            </Button>

            <Button
              variant="flat"
              as={Link}
              color="default"
              href="https://docs.google.com/forms/d/e/1FAIpQLSdFBSjoY5HW4QeUwOPn2gBruzUwW4utGR1TAGIXa4UoQwmKgg/viewform?usp=send_form"
              target="_blank"
            >
              Contribute <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
};

// export default dynamic(() => Promise.resolve(Banner), { ssr: false });
export default Banner;
