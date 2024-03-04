"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { isLoggedIn } from "@/utils/auth";
import { usePathname, useRouter } from "next/navigation";
import Sad from "@/assets/Sad";
import dynamic from "next/dynamic";
import BottomBar from "./BottomBar";
import AnimatedCursor from "react-animated-cursor";
import dynamicTheme from "@/utils/theme";
import { toast } from "react-hot-toast";
import Logo from "../assets/Logo";

const Navbar = () => {
  const [isloggingOut, setIsLoggingOut] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [isCustomCursor, setIsCustomCursor] = useState(false);

  useEffect(() => {
    const cursor = localStorage.getItem("isCustomCursor");
    setIsCustomCursor(cursor ? JSON.parse(cursor) : false);
    // check if the user is new from localstorage isNew key
    const isNewUser = localStorage.getItem("isNew");
    if (isNewUser) {
      setIsNew(false);
    }
  }, []);

  const location = usePathname();
  const router = useRouter();
  const { loggedIn } = isLoggedIn();

  dynamicTheme();

  const handleIsNew = () => {
    setIsNew(false);
    localStorage.setItem("isNew", "false");
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      const theme = localStorage.getItem("theme");
      // remove token and user from localstorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userData");
      localStorage.setItem("theme", theme as string);
      window.location.href = "/resources";
      const modal = document.getElementById("logout_modal") as HTMLInputElement;
      if (modal) {
        modal.checked = false;
      }
      setIsLoggingOut(false);
    }, 1000);
  };

  const loginRedirect = () => {
    localStorage.setItem("redirectPath", location || "/");
    router.push("/auth/login");
    // toast.error("This feature is not available yet", {
    //   className:
    //     "!bg-base-200/50 backdrop-blur-lg !text-base-content shadow-lg",
    // });
  };

  return (
    <>
      {isCustomCursor && (
        <AnimatedCursor
          innerStyle={{
            backgroundColor: "var(--inner-color)",
          }}
          outerStyle={{
            backgroundColor: "var(--outer-color)",
            mixBlendMode: "difference",
          }}
        />
      )}
      <div
        className={`navbar bg-base-100/70 fixed z-30 text-content backdrop-blur-lg transition-all duration-1000 top-0 ${
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

            <div className="drawer-side z-40" tabIndex={0}>
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <li>
                  <Link href={"/"}>Home</Link>
                </li>
                {loggedIn && (
                  <li>
                    <Link href={"/dashboard"}>Dashboard</Link>
                  </li>
                )}
                <li>
                  <Link href={"/resources"}>Resources</Link>
                </li>
                <li>
                  <Link href={"/resources/subjects"}>Subjects</Link>
                </li>
                {/* <li>
                  <Link href={"/resources/announcements"}>Announcements</Link>
                </li>
                <li>
                  <Link href={"/resources/dl"}>DL's</Link>
                </li> */}
                <li>
                  <Link href={"/settings/preference"}>Settings</Link>
                </li>
                <li>
                  <a href="https://divinelydeveloper.me">About</a>
                </li>
                <li>
                  <a href="https://divinelydeveloper.me">Contact</a>
                </li>
              </ul>
            </div>
          </div>
          <Link
            href={"/"}
            className="btn btn-ghost text-xl after:content-[''] after:text-xs after:mb-2"
          >
            <Logo />
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
          <Link
            href={"/settings/preference"}
            className="btn btn-ghost btn-sm btn-square mr-4 hidden md:flex"
          >
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
                d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
              />
            </svg>
          </Link>

          <div className="hidden md:block form-control mr-4 ">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-30 md:w-auto h-10 transition-all duration-1000"
              onFocus={(e) => {
                toast.error("Coming soon!", {
                  icon: "🚧",
                  id: "search-coming-soon",
                  position: "bottom-center",
                });
                // disable input for now
                e.target.blur();
              }}
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
              <button
                className="btn btn-primary btn-sm rounded-btn mr-4"
                onClick={loginRedirect}
              >
                Sign In
              </button>
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
      {isNew && (
        <div
          className="card max-w-96 w-full bg-base-100 shadow-xl fixed bottom-[50%] translate-y-[50%] z-10 left-[50%] translate-x-[-50%] px-8 py-4 md:left-1 md:bottom-1 md:translate-x-0 md:translate-y-0"
          id="updated-popup"
        >
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={handleIsNew}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">New Look and Feel!</h3>
          <p className="py-4 text-sm">
            Devocode just got updated.{" "}
            <a
              className="link"
              href="https://github.com/imankitkalirawana/dynamic-devocode"
              target="_blank"
            >
              Know more!
            </a>
          </p>
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
