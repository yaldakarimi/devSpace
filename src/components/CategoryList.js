import Link from 'next/link';
export default function CategoryList({ categories }) {
  return (
    <div className='w-full p-5 bg-white rounded-lg shadow-md mt-6'>
      <h3 className='text-l bg-gray-800 text-white p-3 rounded lg:text-2xl '>
        Blog Categories
      </h3>

      <ul className='divide-y divide-gray-300'>
        {categories &&
          categories.map((category, index) => (
            <Link href={`/blog/category/${category.toLowerCase()}`} key={index}>
              <li className='p-4 cursor-pointer hover:bg-gray-50 text- text-sm lg:text-base'>
                {category}
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
}
