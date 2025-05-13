"use client";

import { usePathname } from "next/navigation";
import NavbarComponent from "./navbar";

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const noNavbarPages = [
    "/dashboard/home",
    "/dashboard/knowledge-base",
    "/dashboard/analytics",
    "/dashboard/settings",
    "/dashboard/paths",
    "/dashboard/team",
    "/dashboard/questions",
  ];

  const shouldShowNavbar = !noNavbarPages.includes(pathname);

  return (
    <>
      {pathname === "/posts" && <h1>Welcome to Posts page!</h1>}
      {shouldShowNavbar ? (
        <div className="hide-scrollbar hide-scrollbar mx-auto min-h-screen w-[90%] max-w-screen">
          <NavbarComponent />
          {children}
        </div>
      ) : (
        <>
          <div className="hide-scrollbar">{children}</div>
        </>
      )}
    </>
  );
};
