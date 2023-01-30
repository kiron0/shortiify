import React, { useContext } from "react";
import { InitializeContext } from "../../App";
import { themeOptions } from "./data";
import styles from "./ThemeChanger.module.css";

export default function ThemeChanger() {
  const { theme, setTheme } = useContext(InitializeContext);

  const handleThemeChange = (e: any) => {
    setTheme(e.target.value);
    window.localStorage.setItem("shortenerTheme", e.target.value);
  };

  return (
    <div>
      <label
        htmlFor="themeChanger"
        className="btn btn-sm btn-primary rounded-full h-8 w-8 absolute right-1 top-1/3"
      >
        <i className={`bx bx-cog text-lg text-white ${styles.themeBtn}`}></i>
      </label>

      <input type="checkbox" id="themeChanger" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-[url('./assets/bg2.jpg')]">
          <h3 className="text-lg font-bold flex items-center gap-1 text-white">
            <i className={`bx bx-cog text-lg ${styles.themeBtn}`}></i>Choose
            your theme from here
          </h3>
          <div className="name border rounded p-3 relative mt-10">
            <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
              <h3 className="text-xs font-poppins">Theme Chooser</h3>
            </div>
            <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 max-w-md overflow-hidden">
              <div className="icon text-white">
                <i className="bx bxs-hot"></i>
              </div>
              <select
                className="select w-full text-white max-w-sm md:ml-2 capitalize bg-transparent"
                name="theme"
                onChange={handleThemeChange}
                value={theme ? theme : "night"}
              >
                <option disabled selected className="text-black">
                  Choose your theme
                </option>
                {themeOptions.map((option, index: number) => (
                  <option value={option.value} key={index} className="text-black">{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-3 font-semibold text-white">
            <p>
              Current theme:{" "}
              <span className="capitalize btn btn-xs btn-primary cursor-default no-animation text-white">
                {theme ? theme : "night"}
              </span>
            </p>
          </div>

          <div className="modal-action">
            <label htmlFor="themeChanger" className="btn btn-warning">
              <i className="bx bx-x text-xl"></i> Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
