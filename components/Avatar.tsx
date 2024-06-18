import * as React from "react";
import Image from "./Image";
import clsx from "clsx";

export interface IAvatarProps {
  src: string;
  alt: string;
  className?: string;
}

export const Avatar: React.FC<IAvatarProps> = ({ src, alt, className }) => {
  return (
    <div className={clsx("avatar", className && className)}>
      <div className="w-20 rounded-full">
        <Image width="0" height="0" alt={alt} src={src} />
      </div>
    </div>
  );
};
