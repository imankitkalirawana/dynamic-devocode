"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { isLoggedIn } from "@/utils/auth";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import BottomBar from "./BottomBar";
import AnimatedCursor from "react-animated-cursor";
import dynamicTheme from "@/utils/theme";
import { toast } from "sonner";
import Logo from "../assets/Logo";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

const Navbar = () => {
  const [isloggingOut, setIsLoggingOut] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
      window.location.reload();

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
        className={`navbar bg-base-100/50 fixed z-30 text-content backdrop-blur-lg transition-all duration-1000 top-0 ${
          location?.startsWith("/auth") ? "hidden" : ""
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <Button
              as={"label"}
              htmlFor="my-drawer"
              isIconOnly
              variant="light"
              radius="full"
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
            </Button>
          </div>
          <Button
            as={Link}
            href={"/"}
            variant="light"
            className="btn btn-ghost text-xl after:content-[''] after:text-xs after:mb-2"
          >
            <Logo />
            DevoCode
          </Button>
        </div>
        <div className="hidden lg:block navbar-center">
          <div className="flex items-stretch">
            {loggedIn ? (
              <Button
                size="sm"
                variant="light"
                as={Link}
                href={"/dashboard"}
                className="text-sm"
              >
                Dashboard
              </Button>
            ) : (
              <Button
                size="sm"
                variant="light"
                as={Link}
                className="text-sm"
                href={"/"}
              >
                Home
              </Button>
            )}
            <Button
              href={"/resources"}
              size="sm"
              variant="light"
              as={Link}
              className="text-sm"
            >
              Resources
            </Button>
            <Button
              href="https://divinelydeveloper.me"
              size="sm"
              variant="light"
              as={"a"}
              className="text-sm"
            >
              About
            </Button>
            <Button
              href={"/"}
              size="sm"
              variant="light"
              as={Link}
              className="text-sm"
            >
              Contact
            </Button>
          </div>
        </div>
        <div className="navbar-end">
          <Button
            href={"/settings"}
            className="btn btn-ghost btn-sm btn-square mr-4 hidden md:flex"
            as={Link}
            isIconOnly
            variant="light"
            radius="full"
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
          </Button>

          <div className="hidden form-control mr-4 ">
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
            <Dropdown>
              <DropdownTrigger>
                <Avatar name="AK" className="cursor-pointer mr-4" />
              </DropdownTrigger>
              <DropdownMenu aria-label="Menu">
                <DropdownItem as={Link} href="/admin/dashboard">
                  Admin
                </DropdownItem>
                <DropdownItem as={Link} href="/settings">
                  Profile
                </DropdownItem>
                <DropdownItem as={Link} href="/settings">
                  Settings
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  variant="flat"
                  className="text-danger"
                  onPress={onOpen}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              <Button
                className="mr-2"
                variant="flat"
                color="primary"
                onClick={loginRedirect}
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="md:hidden">
        <BottomBar />
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Logout</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to logout?</p>
              </ModalBody>
              <ModalFooter className="flex-col sm:flex-row">
                <Button
                  color="default"
                  fullWidth
                  variant="flat"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  fullWidth
                  onPress={handleLogout}
                  isLoading={isloggingOut}
                >
                  Logout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {isNew && (
        <div
          className="card max-w-96 w-full bg-base-100/50 backdrop-blur-lg shadow-xl fixed bottom-[50%] translate-y-[50%] z-10 left-[50%] translate-x-[-50%] px-8 py-4 md:left-1 md:bottom-1 md:translate-x-0 md:translate-y-0"
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
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side z-50" tabIndex={0}>
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-100/50 backdrop-blur-lg text-base-content">
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
          <li>
            <Link href={"/settings"}>Settings</Link>
          </li>
          <li>
            <a href="https://divinelydeveloper.me">About</a>
          </li>
          <li>
            <a href="https://divinelydeveloper.me">Contact</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
