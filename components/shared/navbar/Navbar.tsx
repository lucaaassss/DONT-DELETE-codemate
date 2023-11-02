import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "../search/GlobalSearch";

// Navigation bar or nav bar for short
const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          width={40}
          height={40}
          alt="Codemate"
        />
        <p className="h2-bold font-spaceGrotesk text-purple-800 dark:text-purple-500 max-sm:hidden">
          ode<span className="text-purple-500 dark:text-purple-300">mate</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex-between gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
          {/* only show the user button only if we are indeed logged in */}
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
