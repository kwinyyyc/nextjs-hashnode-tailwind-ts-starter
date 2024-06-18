import * as React from "react";
import { Post } from "../generated/graphql";
import { CoverImage } from "./CoverImage";
import Link from "next/link";

export interface IArticlePreviewProps {
  post: Post;
}

export const ArticlePreview: React.FC<IArticlePreviewProps> = ({ post }) => {
  return (
    <>
      <article className="card mb-8 bg-base-100 shadow-xl">
        <Link href={post.slug}>
          <figure>
            <CoverImage url={post.coverImage?.url as string} alt={post.title} />
          </figure>
        </Link>
        <div className="card-body">
          <Link href={post.slug}>
            <h3 className="font-bold">{post.title}</h3>
          </Link>
          <p>{post.brief}</p>
        </div>
      </article>
    </>
  );
};
