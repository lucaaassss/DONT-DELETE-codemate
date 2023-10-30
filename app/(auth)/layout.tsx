import React from "react";

// we have to start with uppercase when naming our component.In this case our component name is Layout
const Layout = ({ children }: { children: React.ReactNode }) => {
  // children is all of the pages that is in the same location as the layout.tsx
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      {children}
    </main>
  );
};

export default Layout;
