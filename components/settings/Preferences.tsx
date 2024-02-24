"use client";
import { useEffect, useState } from "react";

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

const Preference = () => {
  const [currentTheme, setCurrentTheme] = useState("default");

  const handleThemeChange = (theme: any) => {
    setCurrentTheme(theme);
    if (theme === "default") {
      localStorage.removeItem("theme");
      dynamicTheme();
      return;
    }
    localStorage.setItem("theme", theme);
    document.documentElement.dataset.theme = theme;
  };

  const dynamicTheme = () => {
    const date = new Date();
    const hours = date.getHours();
    const month = date.getMonth();

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

  return (
    <>
      <div className="col-span-full lg:col-span-9">
        <div className="flex flex-col">
          <h3 className="text-base font-semibold leading-7 ">Appearance</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 ">
            Choose a theme that matches your taste.
          </p>
        </div>
        <div className="rounded-box grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-4xl mt-8">
          {themes.map((theme) => (
            <div
              className={`border-base-content/20 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent ${
                currentTheme == theme
                  ? "outline-offset-2 outline-primary"
                  : "hover:outline-offset-2 hover:outline-primary"
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
