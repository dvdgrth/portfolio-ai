import Link from "next/link";
import React from "react";

const BackToHome: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 p-2 z-50">
      <Link href="/">
        <span className="inline-flex items-center font-bold no-underline border px-2 py-0.5  text-xl">
          ←
        </span>
      </Link>
    </div>
  );
};

export default BackToHome;
