import * as React from 'react';
import Image from './Image';

export interface ICoverImageProps {
  url: string;
  alt: string;
}

export const CoverImage: React.FC<ICoverImageProps> = ({ url, alt }) => {
    return (
      <Image
              width="0"
              height="0"
              className="h-auto max-h-52 w-full object-cover"
              src={url}
              alt={alt}
            />
    );
}
