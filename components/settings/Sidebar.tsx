"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
  {
    name: "logs",
    href: "/settings/logs",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="flex col-span-full lg:col-span-3 justify-center lg:justify-start mb-8 lg:mb-0">
        <ul className="flex lg:flex-col">
          {Items.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`btn btn-sm sm:btn-md w-full justify-start max-w-60 text-start transition-all ${
                  pathname == item.href ? "btn-primary" : "btn-ghost"
                }`}
              >
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
