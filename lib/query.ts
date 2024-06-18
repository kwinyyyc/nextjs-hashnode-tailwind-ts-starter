import request, { RequestDocument } from "graphql-request";
import {
  Post,
  PostsByPublicationQuery,
  PostsByPublicationQueryVariables,
  Publication,
  SinglePostByPublicationQuery,
  SinglePostByPublicationQueryVariables,
} from "../generated/graphql";

export const getAllPosts = async ({
  query,
}: { query?: RequestDocument } = {}): Promise<{
  posts: Post[];
  publication: Publication;
}> => {
  const q: RequestDocument =
    query ||
    `
  query Publication($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      title
      displayTitle
      descriptionSEO
      about {
        text
      }
      author {
        name
        profilePicture
      }
      posts(first: $first, after: $after) {
        edges {
          node {
            slug
            id
            title
            brief
            url
            tags {
              slug
            }
            coverImage {
              url
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

  const variables: PostsByPublicationQueryVariables = {
    first: 20,
    host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
  };

  const data = await request<PostsByPublicationQuery>(
    process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT,
    q,
    variables,
  );

  const posts = data.publication?.posts?.edges?.map(({ node }) => node) ?? [];
  while (data.publication?.posts.pageInfo.hasNextPage) {
    const cursor = data.publication?.posts.pageInfo.endCursor;
    const nextData = await request<PostsByPublicationQuery>(
      process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT,
      q,
      { ...variables, after: cursor },
    );
    posts.push(
      ...(nextData.publication?.posts?.edges?.map(({ node }) => node) ?? []),
    );
  }

  const publication = data.publication;
  return { posts, publication } as { posts: Post[]; publication: Publication };
};

export const getSinglePost = async ({
  slug,
}: {
  slug: string;
}): Promise<SinglePostByPublicationQuery> => {
  const query: RequestDocument = `
  query Publication($host: String!, $slug: String!) {
    publication(host: $host) {
      title
      displayTitle
      descriptionSEO
      about {
        text
      }
      post(slug: $slug) {
        publication {
          about {
            text
          }
        }
        slug
        id
        title
        brief
        url
        publishedAt
        tags {
          slug
        }
        coverImage {
          url
        }
        seo {
          title
          description
        }
        author {
          name
          profilePicture
        }
        content {
          markdown
          html
        }
      }
    }
  }
`;

  const variables: SinglePostByPublicationQueryVariables = {
    slug: slug,
    host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
  };

  const postData = await request<SinglePostByPublicationQuery>(
    process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT,
    query,
    variables,
  );
  return postData;
};
