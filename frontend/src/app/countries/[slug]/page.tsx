import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
  };
}

interface University {
  university_name: string;
}

function UniCard(uni: University) {
  const href = `/schools/${uni.university_name}`
  return (
    <Link href={href}>
      <div className="h-24 px-12 shadow rounded-lg flex flex-col justify-center items-center bg-gray-700">
        <div className="text-white font-semibold text-lg">{uni.university_name}</div>
      </div>
    </Link>
  );
}

export default async function Page({ params }: PageProps) {
  const country = decodeURI(params.slug);
  const url = `http://localhost:8000/partner_unis/country/${country}`;
  const universities: University[] = await (await fetch(url)).json();

  return (
    <main className="flex flex-col items-center pt-12 w-full max-w-5xl mx-auto">
      <h2 className="text-2xl w-full">
        <Link href="../">
          <strong>#</strong> {country}
        </Link>
      </h2>
      <div className="mt-12 flex flex-row flex-wrap w-full gap-x-4 gap-y-12 justify-start">
        {universities.map((uni) => UniCard(uni))}
      </div>
    </main>
  );
}
