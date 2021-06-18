import { sortByDate } from '@/utils/index';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import CategoryList from '@/components/CategoryList';
import { getPosts } from '@/lib/posts';

export default function CategoryBlogPage({ posts, category_name, categories }) {
  return (
    <Layout>
      <div className='flex justify-between'>
        <div className='w-3/4 mr-10'>
          <h1 className='text-5xl font-bold border-b-4 p-5'>
            All Posts in {category_name}
          </h1>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {posts &&
              posts.map((post, index) => <Post post={post} key={index} />)}
          </div>
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

  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );

    const { data: frontMatter } = matter(markdownWithMeta);

    return frontMatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { category_name } }) {
  const files = fs.readdirSync(path.join('posts'));

  const posts = getPosts();
  const categories = posts.map((post) => post.frontMatter.category);
  const uniqueCategories = [...new Set(categories)];

  // Filter posts according to the category name

  const categoryPosts = posts.filter(
    (post) => post.frontMatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      posts: categoryPosts,
      category_name,
      categories: uniqueCategories,
    },
  };
}
