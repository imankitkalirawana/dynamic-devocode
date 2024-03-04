import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  SwatchIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "S3 deployed Resources",
    description:
      "We provide you the high speed S3 deployed resources to access the content.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Secure data access",
    description:
      "We don't share your data with anyone. Your data is secure with us.",
    icon: LockClosedIcon,
  },
  {
    name: "Organized content",
    description:
      "We provide you the organized content to access your study resources easily.",
    icon: ArrowPathIcon,
  },
  {
    name: "Customizable platform",
    description:
      "You can customize the platform according to your needs with 30+ handpicked themes.",
    icon: SwatchIcon,
  },
];
const Features = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Access to all features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tightsm:text-4xl flex items-center gap-2 justify-center">
            <img src="/devocode.png" className="w-12" alt="" />
            <span>Everything you need to get started</span>
          </p>
          <p className="mt-6 text-lg leading-8">
            You can use our open source platform to build your knowledge and
            access to all the features you need to prepare for your next LPU
            examination.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
