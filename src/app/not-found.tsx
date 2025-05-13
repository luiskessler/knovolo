import Link from "next/link";
import React from "react";

const Custom404 = () => {
  return (
    <div className="flex min-h-screen flex-col items-center border border-black">
      <h1 style={{ fontSize: "50px" }}>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className="p-12" href={"/"}>
        Go to Home
      </Link>
    </div>
  );
};

export default Custom404;
