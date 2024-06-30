"use client";

import { Button, Input } from "@nextui-org/react";
import { Icon } from "@iconify/react";

const footerNavs = [
  {
    label: "Resources",
    items: [
      {
        href: "#",
        name: "Contact",
      },
      {
        href: "https://telegram.me/imankitkalirawana",
        name: "Support",
      },
      {
        href: "https://telegram.me/divinelyrepo",
        name: "Repository",
      },
      {
        href: "#pricing",
        name: "Pricing",
      },
    ],
  },
  {
    label: "About",
    items: [
      {
        href: "#",
        name: "Terms",
      },
      {
        href: "#",
        name: "License",
      },
      {
        href: "#",
        name: "Privacy",
      },
      {
        href: "https://divinelydeveloper.me/",
        name: "About US",
      },
    ],
  },
  {
    label: "Social",
    items: [
      {
        href: "https://github.com/imankitkalirawana/",
        name: "GitHub",
      },
      {
        href: "https://www.linkedin.com/in/bhuneshvar/",
        name: "LinkedIn",
      },
      {
        href: "https://twitter.com/divinelydevs",
        name: "X",
      },
      {
        href: "https://instagram.me/divinelydeveloper",
        name: "Instagram",
      },
    ],
  },
  {
    label: "Company",
    items: [
      {
        href: "https://divinelydeveloper.me/",
        name: "Developer",
      },
      {
        href: "https://divinelydeveloper.me/",
        name: "About",
      },
      {
        href: "https://telegram.me/imankitkalirawana",
        name: "Contact",
      },
    ],
  },
];
const Footer = () => {
  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="justify-between items-center gap-12 md:flex">
          <div className="flex-1 max-w-lg">
            <h3 className="text-2xl font-bold">
              Get our beautiful newsletter straight to your inbox.
            </h3>
          </div>
          <div className="flex-1 mt-6 md:mt-0">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-x-3 md:justify-end"
            >
              <div className="relative">
                <svg
                  className="w-6 h-6 absolute left-3 inset-y-0 my-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <Input type="email" placeholder="Enter your email" />
              </div>
              <Button isIconOnly variant="flat" color="primary">
                <Icon
                  icon="iconamoon:send-light"
                  width="1.5em"
                  height="1.5em"
                />
              </Button>
              <button
                className="btn btn-primary sm:hidden tooltip"
                data-tip="Subscribe"
              >
                {/* mail icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
        {/* <div className="flex-1 mt-16 space-y-6 justify-between sm:flex md:space-y-0"> */}
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 lg:justify-items-center gap-8 mt-12">
          {footerNavs.map((item, idx) => (
            <ul
              className="space-y-4 col-span-2 md:col-span-4 lg:col-span-3"
              key={idx}
            >
              <h4 className="font-semibold sm:pb-2 text-primary">
                {item.label}
              </h4>
              {item.items.map((el, idx) => (
                <li key={idx}>
                  <a href={el.href} className="link-hover" target="_blank">
                    {el.name}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="divider my-10"></div>
        <div className="items-center justify-center sm:flex mb-10">
          <p>© 2024 Divinely Developer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
