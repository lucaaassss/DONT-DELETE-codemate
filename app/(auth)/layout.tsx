import React from "react";

// we have to start with uppercase when naming our component.In this case our component name is Layout
const Layout = ({ children }: { children: React.ReactNode }) => {
  // children is all of the pages that is in the same location as the layout.tsx
  // we declare the type of our children as React.ReactNode
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      {children}
    </main>
  );
};

export default Layout;

// className="flex min-h-screen w-full items-center justify-center"
// flex: Makes the main element a flex container.
// min-h-screen: Sets the minimum height of the main element to fill the screen's height (at least the viewport's height).
// w-full: Makes the main element take up the full width of its parent.
// items-center: Centers the content vertically within the main element.
// justify-center: Centers the content horizontally within the main element.
