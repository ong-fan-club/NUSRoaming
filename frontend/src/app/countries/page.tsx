import Link from "next/link";

function CountryCard(country: string) {
  const href = `/countries/${country}`;
  return (
    <Link href={href}>
      <div className="h-24 px-12 shadow rounded-lg flex flex-col justify-center items-center bg-gray-700">
        <div className="text-white font-semibold text-lg">{country}</div>
      </div>
    </Link>
  );
}

export default async function Page() {
  const url = `http://localhost:8000/get_all_countries`;
  const countries: string[] = (await (await fetch(url)).json()).map(
    (x: { university_country: string }) => x.university_country
  );

  return (
    <main className="flex flex-col items-center pt-12 w-full max-w-5xl mx-auto">
      <div className="mt-12 flex flex-row flex-wrap w-full gap-x-4 gap-y-12 justify-start">
        {countries.map((country) => CountryCard(country))}
      </div>
    </main>
  );
}
