import * as React from "react";

export interface IFooterProps {
  title?: string;
}

export const Footer: React.FC<IFooterProps> = ({ title }) => {
  return (
    <footer className="border-t border-gray-200 p-4">
      <p className="text-center">{title}</p>
    </footer>
  );
};

export default Footer;
