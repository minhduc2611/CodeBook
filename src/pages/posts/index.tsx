import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { BlogPost } from 'src/shared/blog-post';
import { customFetch } from 'src/shared/utils/fetch';

type THomeProps = {
  blogPosts?: BlogPost[];
};

const Home: FC<THomeProps> = ({ blogPosts = [] }) => {
  return (
    <div>
      <h1>Home</h1>
      {blogPosts.map(({ title, id }) => (
        <div key={id}>
          <Link href={`/${id}`}>{title}</Link>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<THomeProps> = async () => {
  const blogPosts = await customFetch<BlogPost[]>('/api/blog-posts');
  console.log('blogPosts', blogPosts);

  return { props: { blogPosts } };
};

export default Home;
