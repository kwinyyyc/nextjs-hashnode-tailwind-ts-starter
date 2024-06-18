import { NextSeo } from "next-seo";
import clsx from "clsx";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.scss";
import { getAllPosts } from "../lib/query";
import { Post, Publication } from "../generated/graphql";
import React from "react";
import { ArticlePreview } from "../components/ArticlePreview";
import { Avatar } from "../components/Avatar";

export interface IHomeProps {
  posts: Post[];
  publication: Publication;
}

const Home: React.FC<IHomeProps> = ({ posts, publication }) => {
  return (
    <Layout title={publication.title}>
      <NextSeo
        title={publication?.title || "Next.js Static Site Starter"}
        description={publication?.descriptionSEO || ""}
        openGraph={{
          type: "website",
        }}
      />
      <div
        className={clsx(
          "grid shrink-0 grow place-content-center place-items-center",
          styles.hero,
        )}
      >
        <div className="mb-10">
          <Avatar
            className="w-full justify-center md:w-auto"
            src={publication?.author?.profilePicture as string}
            alt={publication?.author?.name}
          />
          <div className="ml-4 inline-block">
            <h1 className="mb-2 mt-4 text-center font-extrabold">
              {publication?.title}
            </h1>
            <p>{publication?.descriptionSEO}</p>
          </div>
        </div>
        {posts.length > 0 &&
          posts.map((post) => <ArticlePreview key={post.id} post={post} />)}
      </div>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const result = await getAllPosts();
  return {
    props: {
      posts: result.posts,
      publication: result.publication,
    },
  };
};

export default Home;
