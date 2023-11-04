import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />
      {/* using the Navbar component that we have declared at the components folder */}
      {/* double click and press ctrl+spacebar to import component */}
      <div className="flex">
        <LeftSidebar />
        {/* using the LeftSidebar component that we have declared at the components folder */}
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
        {/* using the RightSidebar component that we have declared at the components folder */}
      </div>
      Toaster
    </main>
  );
};

export default Layout;

// className="background-light850_dark100 relative"
// background-light850_dark100: Sets the background color or background design of the main element. The class name suggests a background style with specific colors or gradients. //

// className="flex"
// flex: Makes the div element a flex container, allowing its children to be easily arranged in a row or column.

// className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14"
// flex: Makes the section element a flex container.
// min-h-screen: Sets a minimum height for the section element to fill at least the entire screen's height.
// flex-1: Makes the section element take up all available vertical space, allowing it to grow or shrink as needed.
// flex-col: Sets the flex direction of the section element to be a column, arranging its children vertically.
// px-6: Adds padding of 6 units to the left and right sides of the section.
// pb-6: Adds padding of 6 units to the bottom of the section.
// pt-36: Adds padding of 36 units to the top of the section.
// max-md:pb-14 sm:px-14: These classes likely represent responsive design, applying specific padding or styles based on the screen size.

// className="mx-auto w-full max-w-5xl"
// mx-auto: Horizontally centers the div element within its parent.
// w-full: Makes the div element take up the full available width.
// max-w-5xl: Sets a maximum width of 5 extra-large units for the div. It limits its width to a certain maximum size.
// {children}: This is not a class but a placeholder for rendering the child components passed to the Layout.
