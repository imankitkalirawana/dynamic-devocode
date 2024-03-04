"use client"
export default function dynamicTheme() {

  // check if localstorage has dynamicTheme set to true

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
  } else {
    document.documentElement.setAttribute("data-theme", theme || "forest");
  }
};
