import { getStaticProps } from './page/[page_index]';
import BlogPage from './page/[page_index]';

// getStaticProps has to be imported otherwise posts will return null or undefined

export { getStaticProps };
export default BlogPage;
