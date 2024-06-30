import { CheckIcon } from "@heroicons/react/20/solid";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const includedFeatures = ["NEXT UI", "Express", "MongoDB", "Tailwind CSS"];

const Pricing = () => {
  return (
    <div className="relative isolate py-24 sm:py-32" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Help us to provide you better
          </h2>
          <p className="mt-6 text-lg leading-8">
            The platform is completly free to use. We never charge you anything
            to use our platform. We are a non-profit organization and we are
            here to help you.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-neutral sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight">
              Contribute to our platform
            </h3>
            <p className="mt-6 text-base leading-7">
              If you are a NEXT.js developer and want to contribute to our
              platform
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-primary">
                What's included
              </h4>
              <div className="h-px flex-auto divider" />
            </div>

            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-primary"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold">Contribute Now</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight">
                    GitHub
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide">
                    .com
                  </span>
                </p>
                <Button
                  as={Link}
                  href="https://github.com/imankitkalirawana/dynamic-devocode/issues"
                  target="_blank"
                  variant="flat"
                  color="primary"
                >
                  Let's make it
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default dynamic(() => Promise.resolve(Pricing), { ssr: false });
export default Pricing;
