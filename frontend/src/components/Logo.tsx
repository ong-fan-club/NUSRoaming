import Link from "next/link"

export default function Logo () {
  return ( 
    <Link href='/'>
      <div className='text-3xl font-extrabold mx-12'>
        <span className='text-main-blue'>NUS</span><span className='text-dark-grey'>Roaming</span>
      </div>
    </Link>
  );
}