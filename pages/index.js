import Link from 'next/link';
import Layout from '@/components/Layout';
import { getPosts } from '@/lib/posts';
import Post from '@/components/Post';

export default function HomePage({ posts }) {
  return (
    <Layout>
      <h1 className='text-5xl font-bold border-b-4 p-5'>Latest Posts</h1>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts && posts.map((post, index) => <Post post={post} key={index} />)}
      </div>

      <Link href='/blog'>
        <a className='block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full'>
          All Posts
        </a>
      </Link>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts: getPosts().slice(0, 6),
    },
  };
}

// Steps to get the data when using static data inside the project , we have to get use of fs module to read the directory and the files .... step one: read the directory , the name of each file in this folder will be the slug as well so we need to return it but without the extension and the going through the files names to get the front matters and convert them into an object usable in our component
