import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Layout from '@/components/Layout';
import matter from 'gray-matter';
import Post from '@/components/Post';
import { sortByDate } from '../../utils';

export default function BlogPage({ posts }) {
  console.log(posts);
  return (
    <Layout>
      <h1 className='text-5xl font-bold border-b-4 p-5'>Blogs</h1>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts && posts.map((post, index) => <Post post={post} key={index} />)}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'));
  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );

    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      slug,
      frontMatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
