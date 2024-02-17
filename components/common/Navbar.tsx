"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { isLoggedIn } from "@/utils/auth";
import { usePathname } from "next/navigation";
import Sad from "@/assets/Sad";
import dynamic from "next/dynamic";
import BottomBar from "./BottomBar";

const themes = [
  "default",
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

const Navbar = () => {
  const [isloggingOut, setIsLoggingOut] = useState(false);
  const location = usePathname();
  const { loggedIn } = isLoggedIn();

  const handleThemeChange = (theme: string) => {
    const root = window.document.documentElement;
    const isDark = theme !== "light";
    root.classList.remove(isDark ? "light" : "dark");
    if (theme === "default") {
      localStorage.removeItem("theme");
      dynamicTheme();
    } else {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  };

  const dynamicTheme = () => {
    const date = new Date();
    const hours = date.getHours();
    const month = date.getMonth();
    // const hours = 14;
    // const month = 0;

    const sunset = hours >= 17 && hours <= 20;
    const dim = (hours >= 20 && hours <= 23) || (hours >= 0 && hours < 6);
    const theme = localStorage.getItem("theme");

    if (sunset) {
      document.documentElement.setAttribute("data-theme", theme || "sunset");
    } else if (dim) {
      document.documentElement.setAttribute("data-theme", theme || "dim");
    } else if (month === 1) {
      document.documentElement.setAttribute("data-theme", theme || "valentine");
    } else if (month === 10) {
      document.documentElement.setAttribute("data-theme", theme || "halloween");
    } else if (month >= 11 || month < 1) {
      document.documentElement.setAttribute("data-theme", theme || "winter");
    }
  };

  useEffect(() => {
    dynamicTheme();
  }, [dynamicTheme]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      const theme = localStorage.getItem("theme");
      localStorage.clear();
      localStorage.setItem("theme", theme as string);
      window.location.href = "/";
      const modal = document.getElementById("logout_modal") as HTMLInputElement;
      if (modal) {
        modal.checked = false;
      }
      setIsLoggingOut(false);
    }, 1000);
  };

  return (
    <>
      <div
        className={`navbar bg-base-100/70 fixed z-30 text-content backdrop-blur-lg transition-all top-0 ${
          location?.startsWith("/auth") ? "hidden" : ""
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <label
              htmlFor="my-drawer"
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-side" tabIndex={0}>
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <li>
                  <Link href={"/"}>Home</Link>
                </li>
                <li>
                  <Link href={"/resources"}>Resources</Link>
                </li>
                <li>
                  <Link href={"/resources/subjects"}>Subjects</Link>
                </li>
                <li>
                  <Link href={"/resources/announcements"}>Announcements</Link>
                </li>
                <li>
                  <Link href={"/resources/dl"}>DL's</Link>
                </li>
                <li>
                  <a href="https://divinelydeveloper.me">About</a>
                </li>
                <li>
                  <a href="https://divinelydeveloper.me">Contact</a>
                </li>
                <li>
                  <details>
                    <summary>Theme</summary>
                    <ul className="h-80 overflow-y-scroll">
                      {themes.map((theme) => (
                        <li key={theme}>
                          <input
                            type="radio"
                            name="theme-dropdown"
                            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                            value={theme}
                            aria-label={
                              theme != "default"
                                ? theme.charAt(0).toUpperCase() + theme.slice(1)
                                : "Dynamic"
                            }
                            onChange={() => handleThemeChange(theme)}
                          />
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          </div>
          <Link href={"/"} className="btn btn-ghost text-xl">
            DevoCode
          </Link>
        </div>
        <div className="hidden lg:block navbar-center">
          <div className="flex items-stretch">
            {loggedIn ? (
              <Link
                href={"/dashboard"}
                className={`btn btn-${
                  location === "/dashboard" ? "neutral" : "ghost"
                } btn-sm rounded-btn`}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href={"/"}
                className={`btn btn-${
                  location === "/" ? "neutral" : "ghost"
                } btn-sm rounded-btn`}
              >
                Home
              </Link>
            )}
            <Link
              href={"/resources"}
              className={`btn btn-${
                location?.startsWith("/resources") ? "neutral" : "ghost"
              } btn-sm rounded-btn`}
            >
              Resources
            </Link>
            <a
              href="https://divinelydeveloper.me"
              className="btn btn-ghost btn-sm rounded-btn"
            >
              About
            </a>
            <Link href={"/"} className="btn btn-ghost btn-sm rounded-btn">
              Contact
            </Link>
          </div>
        </div>
        <div className="navbar-end">
          <div className="hidden lg:block dropdown mr-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost m-1 flex flex-nowrap"
            >
              Theme
              <svg
                width="12px"
                height="12px"
                className="h-2 w-2 fill-current opacity-60 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
              >
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 h-80 overflow-y-scroll"
            >
              {themes.map((theme) => (
                <li key={theme}>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className={`theme-controller btn btn-sm btn-block justify-start btn-ghost`}
                    value={theme}
                    aria-label={
                      theme != "default"
                        ? theme.charAt(0).toUpperCase() + theme.slice(1)
                        : "Dynamic"
                    }
                    onChange={() => handleThemeChange(theme)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:block form-control mr-4">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-30 md:w-auto h-10"
            />
          </div>
          {loggedIn ? (
            <div className="dropdown dropdown-bottom dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="avatar placeholder mr-4"
              >
                <div className="bg-neutral text-neutral-content rounded-full w-12">
                  <span>AK</span>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52"
              >
                <li>
                  <Link href="/admin/dashboard">Admin</Link>
                </li>
                <li>
                  <Link href="/settings/profile">Profile</Link>
                </li>
                <li>
                  <Link href="/settings/overview">Settings</Link>
                </li>
                <li>
                  <label className="text-error" htmlFor="logout_modal">
                    Logout
                  </label>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                href={"/auth/login"}
                className="btn btn-primary btn-sm rounded-btn mr-4"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="md:hidden">
        <BottomBar />
      </div>
      <input type="checkbox" id="logout_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box max-w-96">
          <div className="max-w-40 mx-auto flex mb-8">
            <Sad />
          </div>
          <div className="flex modal-action">
            <button
              className="btn btn-primary flex-1"
              onClick={handleLogout}
              disabled={isloggingOut}
            >
              {isloggingOut ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                "Logout"
              )}
            </button>
            <label className="btn flex-1" htmlFor="logout_modal">
              Cancel
            </label>
          </div>
        </div>

        <label className="modal-backdrop" htmlFor="logout_modal">
          Close
        </label>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
