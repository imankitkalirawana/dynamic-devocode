// import { Switch } from "@headlessui/react";
"use client";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import dynamic from "next/dynamic";

const Contact = () => {
  return (
    <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
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
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Contact sales
        </h2>
        <p className="mt-2 text-lg leading-8">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="label">
              <span className="label-text">First Name</span>
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="input input-bordered w-full bg-transparent"
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="label">
              <span className="label-text">Last Name</span>
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="input input-bordered w-full bg-transparent"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="compnay" className="label">
              <span className="label-text">Company</span>
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="company"
                id="company"
                autoComplete="organization"
                className="input input-bordered w-full bg-transparent"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="input input-bordered w-full bg-transparent"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 ring-0 outline-none border-none sm:text-sm"
                >
                  <option>IN</option>
                  <option>US</option>
                  <option>EU</option>
                </select>
                <ChevronDownIcon
                  className="pointer-events-none absolute right-3 top-0 h-full w-5"
                  aria-hidden="true"
                />
              </div>
              <input
                type="tel"
                name="phone-number"
                id="phone-number"
                autoComplete="tel"
                className="input input-bordered w-full bg-transparent"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="label">
              <span className="label-text">Message</span>
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows={4}
                className="textarea textarea-bordered w-full bg-transparent"
                defaultValue={""}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button type="submit" className="btn btn-primary w-full">
            Let's talk
          </button>
        </div>
      </form>
    </div>
  );
};

// export default dynamic(() => Promise.resolve(Contact), { ssr: false });
export default Contact;
