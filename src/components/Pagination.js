import Link from 'next/link';

export default function Pagination({ numPages, currentPage }) {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = `/blog/page/${currentPage - 1}`;
  const nextPage = `/blog/page/${currentPage + 1}`;

  if (numPages === 1) return <></>;

  return (
    <div className='mt-6'>
      <ul className='flex pl-10 list-none my-2'>
        {!isFirst && (
          <Link href={prevPage}>
            <li className='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-l hover:bg-gray-200 cursor-pointer ml-1'>
              Previous
            </li>
          </Link>
        )}

        {/* Create an array from an object with the length of numPages and then iterate through it and return that JSX for each
        underscore is a pattern to denote an unused argument/ underscore is a place holder to the callback function. The first argument is the element of the array and the second is the index of the element. since the first is not used, they give an 
        */}

        {Array.from({ length: numPages }, (_, i) => (
          <Link href={`/blog/page/${i + 1}`}>
            <li className='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-l hover:bg-gray-200 cursor-pointer ml-1'>
              {i + 1}
            </li>
          </Link>
        ))}

        {!isLast && (
          <Link href={nextPage}>
            <li className='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-l hover:bg-gray-200 cursor-pointer ml-1'>
              Next
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
}
