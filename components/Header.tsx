import React from "react";
import Link from "./ActiveLink";
import { ThemeSwitcher } from "./ThemeSwitcher";

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-200 px-4">
      <nav className="navbar flex justify-center">
        <ul className="menu dropdown-content navbar-center menu-sm z-[1] flex w-52 flex-row items-center justify-center gap-4 rounded-box bg-base-100 p-2 shadow">
          {[
            {
              label: "Home",
              href: "/",
            },
          ].map(({ href, label }, i) => {
            return (
              <li key={i}>
                <Link href={href}>{label}</Link>
              </li>
            );
          })}
          <ThemeSwitcher />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
