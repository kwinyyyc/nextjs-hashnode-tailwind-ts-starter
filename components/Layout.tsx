import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

import * as React from "react";

export interface ILayoutProps {
  title?: string;
  children?: ReactNode;
}

export const Layout: React.FC<ILayoutProps> = ({ title, children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex max-w-full shrink-0 grow flex-col p-0 sm:p-6 md:p-8 lg:max-w-screen-lg">
        {children}
      </main>
      <Footer title={title} />
    </div>
  );
};

export default Layout;
