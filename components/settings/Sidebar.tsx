"use client";
import React from "react";
import { usePathname } from "next/navigation";

const Items = [
  {
    name: "overview",
    href: "/settings/overview",
  },
  {
    name: "profile",
    href: "/settings/profile",
  },
  {
    name: "preference",
    href: "/settings/preference",
  },
  {
    name: "security",
    href: "/settings/security",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="flex flex-col col-span-full lg:col-span-3">
        <ul>
          {Items.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className={`btn w-full justify-start max-w-60 text-start transition-all ${
                  pathname == item.href ? "btn-primary" : "btn-ghost"
                }`}
              >
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
