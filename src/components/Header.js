import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <header className='bg-gray-900 text-gray-100 shadow w-full'>
      <div className='container mx-auto flex flex-wrap p-5 items-center flex-col md:flex-row'>
        <Link href='/'>
          <a className='flex items-center md:w-1/5 md:justify-start mb-4 md:mb-0 title-font font-medium'>
            <Image src='/images/logo.png' width={40} height={40} alt='logo' />
            <span className='ml-3 text-xl'>DevSpace</span>
          </a>
        </Link>

        <nav className='flex flex-wrap md:w-4/5 items-center justify-end uppercase text-base md:ml-auto'>
          <Link href='/blog'>
            <a className='mx-5 cursor-pointer hover:text-indigo-300'>blog</a>
          </Link>
          <Link href='/about'>
            <a className='mx-5 cursor-pointer hover:text-indigo-300'>about</a>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
