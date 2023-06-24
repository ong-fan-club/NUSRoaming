import Image from 'next/image'
import Link from 'next/link';

function Header() {
  return (
    <div className='flex flex-col max-w-md'>
      <div className='flex flex-row items-center'>
        <Image 
          src="/guy.svg"
          alt="Emoji man with suitcase"
          width={0}
          height={0}
          sizes="100vw"
          className="w-72 h-auto"
        />
        <div className='text-3xl font-medium w-80 m-8 ml-2'>
          The world is your classroom.
        </div>
      </div>
      <div className='text-lg text-right'>
        Everything you need to know about NUS Student Exchange at your fingertips
      </div>

    </div>
  )
}

interface CountryItemProps {
  name: string;
  slug: string;
}

function CountryItem(props: CountryItemProps) {
  return (
    <Link href={"/countries/" + props.slug}>
      <div className="text-2xl p-5">{props.name}</div>
    </Link>
  );
}

async function CountryList() {
  // TODO: Make an APIService and do this properly with state management

  interface University {
    university_country: string;
  }

  const popular: string[] = (
    await (await fetch("http://localhost:8000/get_popular_countries")).json()
  ).map((university: University) => university.university_country);

  return (
    <div className="w-full my-20 flex flex-row justify-center">
      <div className="max-w-5xl flex flex-col">
        <div className="text-2xl ml-5 mb-10">
          Popular Destinations
          <Image
            src="/airplane-landing.svg"
            alt="Airplane landing"
            width={0}
            height={0}
            sizes="100vw"
            className="ml-4 h-12 w-auto inline-block"
          />
        </div>
        <div className='flex flex-row flex-wrap'>
          { popular.map(x => <CountryItem slug={x} name={x} />) }
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="flex flex-col items-center pt-12">
      <Header />
      <CountryList />
    </main>
  )
}
