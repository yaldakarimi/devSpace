import fs from 'fs';
import path from 'path';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import CategoryList from '@/components/CategoryList';
import Pagination from '@/components/Pagination';
import { POSTS_PER_PAGE } from '@/config/index';
import { getPosts } from '@/lib/posts';

export default function BlogPage({ posts, numPages, currentPage, categories }) {
  return (
    <Layout>
      <div className='flex justify-between'>
        <div className='w-3/4 mr-10'>
          <h1 className='text-5xl font-bold border-b-4 p-5'>Blogs</h1>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {posts &&
              posts.map((post, index) => <Post post={post} key={index} />)}
          </div>

          <Pagination currentPage={currentPage} numPages={numPages} />
        </div>

        <div className='w-1/4 '>
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths = [];
  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = parseInt((params && params.page_index) || 1);

  const files = fs.readdirSync(path.join('posts'));

  const posts = getPosts();

  // Get categories for the side bar
  const categories = posts.map((post) => post.frontMatter.category);
  const uniqueCategories = [...new Set(categories)];

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE); //only want it in the component so it was written again in order to be passed to the component

  const pageIndex = page - 1;
  const orderedPosts = posts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  );

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories,
    },
  };
}
