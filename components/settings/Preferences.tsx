"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@nextui-org/react";

const themes = [
  "default",
  "light",
  // "dark",
  "cupcake",
  // "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  // "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  // "aqua",
  // "lofi",
  // "pastel",
  "fantasy",
  // "wireframe",
  "black",
  // "luxury",
  "dracula",
  // "cmyk",
  // "autumn",
  // "business",
  // "acid",
  "lemonade",
  "night",
  // "coffee",
  "winter",
  "dim",
  // "nord",
  "sunset",
];

const Preference = () => {
  const [currentTheme, setCurrentTheme] = useState("");
  const [isCustomCursor, setIsCustomCursor] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cursor = localStorage.getItem("isCustomCursor");
    setIsCustomCursor(cursor ? JSON.parse(cursor) : false);
  });

  const handleCustomCursor = () => {
    setIsCustomCursor(!isCustomCursor);
    localStorage.setItem("isCustomCursor", JSON.stringify(!isCustomCursor));
    router.refresh();
  };

  const handleThemeChange = (theme: any) => {
    if (theme === "default") {
      setCurrentTheme("");
      localStorage.removeItem("theme");
      document.documentElement.removeAttribute("data-theme");
      // change classname of html element
      document.documentElement.className = "light";
    } else {
      setCurrentTheme(theme);
      localStorage.setItem("theme", theme);
      document.documentElement.dataset.theme = theme;
      document.documentElement.className = "dark";
    }
  };

  return (
    <>
      <div className="col-span-full lg:col-span-9">
        <div className="flex flex-col">
          <h3 className="text-base font-semibold leading-7 ">Settings</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 ">
            Change your preferences.
          </p>
        </div>
        <div className="divider"></div>

        <label
          htmlFor="custom-cursor"
          className="mt-8 flex justify-between items-center"
        >
          <div className="flex flex-col">
            <p className="text-sm font-semibold leading-5 ">Animated Cursor</p>
            <p className="text-sm leading-5 ">
              Enable the customised animated cursor.
            </p>
          </div>
          {/* <input
            id="custom-cursor"
            type="checkbox"
            className="toggle toggle-primary"
            onChange={handleCustomCursor}
            checked={isCustomCursor}
          /> */}
          <Switch
            onChange={handleCustomCursor}
            isSelected={isCustomCursor}
            id="custom-cursor"
            aria-label="Automatic updates"
          />
        </label>

        <div className="divider"></div>
        {/* Themes */}
        <div className="flex flex-col">
          <h3 className="text-base font-semibold leading-7 ">Appearance</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 ">
            Choose a theme that matches your taste.
          </p>
        </div>
        <div className="rounded-box grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-4xl mt-8">
          {themes.map((theme) => (
            <div
              className={`border-base-content/20 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 ${
                currentTheme == theme
                  ? "outline-primary"
                  : "hover:outline-offset-2 hover:outline-primary outline-transparent"
              }`}
              data-set-theme={theme}
              key={theme}
              onClick={() => handleThemeChange(theme)}
            >
              <div
                data-theme={theme}
                className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
              >
                <div className="grid grid-cols-5 grid-rows-3">
                  <div className="bg-base-200 col-start-1 row-span-2 row-start-1"></div>{" "}
                  <div className="bg-base-300 col-start-1 row-start-3"></div>{" "}
                  <div className="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2">
                    <div className="font-bold">{theme}</div>{" "}
                    <div className="flex flex-wrap gap-1">
                      <div className="bg-primary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                        <div className="text-primary-content text-sm font-bold">
                          A
                        </div>
                      </div>{" "}
                      <div className="bg-secondary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                        <div className="text-secondary-content text-sm font-bold">
                          A
                        </div>
                      </div>{" "}
                      <div className="bg-accent flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                        <div className="text-accent-content text-sm font-bold">
                          A
                        </div>
                      </div>{" "}
                      <div className="bg-neutral flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                        <div className="text-neutral-content text-sm font-bold">
                          A
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Preference;
