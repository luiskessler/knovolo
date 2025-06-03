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
      {shouldShowNavbar ? (
        <>
          <div className="flex flex-col items-center overflow-x-hidden border-white">
            <NavbarComponent />
            {children}
          </div>
        </>
      ) : (
        <>
          <div className="hide-scrollbar">{children}</div>
        </>
      )}
    </>
  );
};
