import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { BlogPost } from 'src/shared/blog-post';
import { customFetch } from 'src/shared/utils/fetch';

type TBlogProps = {
  post?: BlogPost;
};

const Blog: FC<TBlogProps> = ({ post = {} }) => {
  return (
    <div>
      <Link href={'/'}>Home</Link>
      <h1>Blog {post.title}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<TBlogProps> = async (
  ctx,
) => {
  const id = ctx.query.id;
  const post = await customFetch<BlogPost>(`/api/blog-posts/${id}`);
  return { props: { post } };
};

export default Blog;
