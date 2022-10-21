import * as esbuild from 'esbuild-wasm';
import { FC } from 'react';
import { BlogPost } from './../../shared/blog-post';

type THomeProps = {
  blogPosts?: BlogPost[];
};

/**
 * ==========
 */

import { useEffect } from 'react';
async function compile(code) {
  await esbuild.initialize({
    wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.54/esbuild.wasm'
  });

  const options = {
    loader: 'jsx' as esbuild.Loader
  };

  try {
    const result = await esbuild.transform(code, options);
    return result.code;
  } catch (err) {
    console.log(err);
  }
}
const code = `
  import React from 'https://cdn.skypack.dev/react';
  import ReactDOM from 'https://cdn.skypack.dev/react-dom';

  import a from './sample';
  console.log(a);

  function App() {
    const [count, setCount] = React.useState(0);

    const clicked = () => {
      setCount(count + 1)
    }

    return (
      <div className='container'>
        <div>Testing</div>
        <button onClick={clicked}>Clicked me times {count}</button>
      </div>
    );
  }

  ReactDOM.render(<App />, document.body);
  `;

function App11() {
  useEffect(() => {
    compile(code).then((compiled) => {
      console.log('compiled', compiled);
    });
  }, []);
  return (
    <div className="child-component">
      <p>My context:</p>
    </div>
  );
}

/**
 * ==========
 */
const Home: FC<THomeProps> = ({}) => {
  return (
    <div>
      <h1>Home</h1>
      <App11 />
      {/* {blogPosts.map(({ title, id }) => (
        <div key={id}>
          <Link href={`/posts/${id}`}>{title}</Link>
        </div>
      ))} */}
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps<THomeProps> = async () => {
//   const blogPosts = await customFetch<BlogPost[]>('/api/blog-posts');

//   return {  };
// };

export default Home;
