import NextImage, { ImageProps } from 'next/image'
import React from 'react'

const customLoader = ({ src }: { src: string }) => {
  return src
}

const Image = (props: ImageProps) => {
  return <NextImage {...props} loader={customLoader} />
}

export default Image
