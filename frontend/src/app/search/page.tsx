import Link from "next/link";

interface University {
  university_name: string;
}

function UniCard(uni: University) {
  const href = `/schools/${uni.university_name}`;
  return (
    <Link href={href}>
      <div className="h-24 px-12 shadow rounded-lg flex flex-col justify-center items-center bg-gray-700">
        <div className="text-white font-semibold text-lg">
          {uni.university_name}
        </div>
      </div>
    </Link>
  );
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  let q: string = ""

  if ('q' in searchParams && typeof searchParams.q === 'string') {
    q = searchParams.q
  }

  let universities: University[] = []
  if (q !== "") {
    let url = `http://localhost:8000/search/${q}`;
    universities = await (await fetch(url)).json();
  }

  console.log(universities)

  return (
    <main className="flex flex-col items-center pt-12 w-full max-w-5xl mx-auto px-6">
      <h2 className="text-2xl w-full">Schools matching: {q}</h2>
      <div className="mt-12 flex flex-row flex-wrap w-full gap-x-4 gap-y-12 justify-start">
        {universities.map((uni) => UniCard(uni))}
      </div>
    </main>
  );
}
