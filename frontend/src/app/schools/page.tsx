import Link from "next/link";

interface Data {
  university_names: string[];
  first_letter: string;
}

function UniCard(uni: string) {
  const href = `/schools/${uni}`;
  return (
    <Link href={href}>
      <div className="h-24 px-12 shadow rounded-lg flex flex-col justify-center items-center bg-gray-700">
        <div className="text-white font-semibold text-lg">{uni}</div>
      </div>
    </Link>
  );
}

export default async function Page() {
  const url = `http://localhost:8000/partner_unis/group_by_first_letter`;
  const universities: Data[] = await (await fetch(url)).json();
  console.log(universities);

  return (
    <main className="flex flex-col items-center pt-12 w-full max-w-5xl mx-auto">
      <h2 className="text-2xl w-full">All Schools</h2>
      <div className="text-xl w-full mt-6">
        Schools starting with
        <br />
        {universities.map((group: Data) => (
          <a href={"#schools-"+group.first_letter} className="inline mr-2">
            { group.first_letter }
          </a>
        ))}
      </div>
      {universities.map((group: Data) => (
        <div className="w-full">
          <a href={"#schools-"+group.first_letter}>
            <div className="mt-8 text-xl" id={"schools-"+group.first_letter}>{ group.first_letter }</div>
          </a>
          <div className="mt-6 flex flex-row flex-wrap w-full gap-x-4 gap-y-12 justify-start">
            { group.university_names.map((uni: string) => UniCard(uni)) }
          </div>
        </div>
      ))}
    </main>
  );
}
