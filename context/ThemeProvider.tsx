"use client";
// createContext can only be used in client-side components, so we have to use "useEffect" or other client-side techniques to use it.
// please note that because this is a client-side component, it cannot be used directly within the pages of our app because they are on the server-side. You can only use it within components. This means that components within your pages can use the context, but not the pages themselves.

// creating our own Context.We have used a context before but that is from third party which is the <ClerkProvider></ClerkProvider> tags
// our context name will be ThemeProvider
import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  // creating the argument to be used in the createContext below
  mode: string;
  setMode: (mode: string) => void; // does not return anything,it simply changes it
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined); // we put argument here because an argument for default value has to be there. Value tu yang kat return tu

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // will make all of the components in the app change to light or dark mode
  const [mode, setMode] = useState(""); // the empty string "" indicates that at the START it will wither be light or dark mode

  const handleThemeChange = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme:dark)").matches)
    ) {
      // check if theme is in dark mode or does not exist in local storage and figuring out if the user's operating system prefers the dark mode
      document.documentElement.classList.add("dark"); // set the mode to dark and add it to the class list of the browser
      setMode("dark");
    } else {
      document.documentElement.classList.remove("dark"); // remove the dark version
      setMode("light");
    }
  };

  useEffect(() => {
    handleThemeChange(); // will call the handleThemeChange everytime the mode changes
  }, [mode]);

  return (
    // provide a value to the context that is then going to be distributed to all other components
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}{" "}
      {/* giving the values to all the children that we nest within the Theme Context Provider */}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context; // if there is no error,return context
}
