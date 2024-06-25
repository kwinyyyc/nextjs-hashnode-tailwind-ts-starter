import React from "react";
import { Post } from "../generated/graphql";
import Image from "../components/Image";
import Link from "next/link";
import Head from "next/head";
import { getAllPosts, getSinglePost } from "../lib/query";
import Layout from "../components/Layout";
import { Avatar } from "../components/Avatar";
import SyntaxHighlighter from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import {
  docco,
  gruvboxDark,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import clsx from "clsx";
import { format, formatDistance, sub } from "date-fns";
import { ThemeContext } from "../components/ThemeSwitcher";

const Article = ({ item }: { item: Post }) => {
  const { isDark } = React.useContext(ThemeContext);
  const { title, publishedAt } = item;
  const date = new Date(publishedAt);
  const thirtyDaysAgo = sub(new Date(), { days: 30 });

  let formattedDate: string = "";
  if (date < thirtyDaysAgo) {
    formattedDate = format(date, "PP");
  } else {
    formattedDate = formatDistance(date, new Date(), { addSuffix: true });
  }

  return (
    <Layout>
      <Head>
        <meta property="og:title" content={item.seo?.title as string} />
        <meta
          property="og:description"
          content={item.seo?.description as string}
        />
        <meta property="og:image" content={item.coverImage?.url as string} />
        <meta property="og:url" content={item.url} />
      </Head>
      <div className="card flex justify-center bg-base-100 shadow-xl">
        <article className="w-full">
          <div className="overflow-hidden">
            <Image
              width="0"
              height="0"
              className="h-auto max-h-52 w-full rounded-t-xl object-cover"
              src={item.coverImage?.url as string}
              alt={title}
            />
            <div className="card-body p-4 md:px-16 md:py-6 lg:px-32 lg:py-12">
              <span className="text-sm">{formattedDate}</span>
              <h2 className="mb-4 font-extrabold">{title}</h2>
              <ReactMarkdown
                components={{
                  code({ inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "");
                    const language = match && match[1];
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={isDark ? gruvboxDark : docco}
                        language={language}
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code
                        className={clsx(
                          className && className,
                          "bg-code-snippet font-normal",
                        )}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
                className="mb-4 border-b border-gray-200 pb-4 [&>*]:mb-4"
              >
                {item.content.markdown
                  .replace(/align="center"/g, "")
                  .replace(/align="right"/g, "")
                  .replace(/align="left"/g, "")}
              </ReactMarkdown>

              <div className="chat chat-start flex items-center text-gray-600">
                <Avatar
                  className="chat-image w-auto justify-center md:w-auto"
                  src={item?.author?.profilePicture as string}
                  alt={item?.author?.name as string}
                />
                <div className="chat-bubble flex flex-wrap">
                  <div className="pb-1">
                    <span className="mx-4">
                      Written by:{" "}
                      <span className="badge">{item?.author?.name}</span>
                    </span>
                  </div>
                  <div className="mx-4 flex-1 basis-full text-sm">
                    {item?.publication?.about?.text}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex cursor-pointer items-center p-8 text-base text-blue-500 md:mb-2 lg:mb-0"
          >
            <svg
              className="mr-2 size-4"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </article>
      </div>
    </Layout>
  );
};

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  if (!params) {
    throw new Error("No params");
  }

  const postData = await getSinglePost({ slug: params.slug });

  if (postData?.publication?.post?.id) {
    return {
      props: {
        item: postData.publication.post,
      },
    };
  }

  return {
    notFound: true,
  };
};

export async function getStaticPaths() {
  const { posts } = await getAllPosts();

  const postSlugs = posts.map(({ slug }) => slug);
  return {
    paths: postSlugs.map((slug) => {
      return {
        params: {
          slug: slug,
        },
      };
    }),
    fallback: false,
  };
}

export default Article;
