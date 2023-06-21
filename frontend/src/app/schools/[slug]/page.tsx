import { link } from "fs";
import { unique } from "next/dist/build/utils";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
  };
}

interface SchoolInfo {
  university_name: string;
  university_website: string[];
  university_country: string;
  faculties_accepted: string;
  module_restrictions: string;
  visa_info: string;
}

export default async function Page({ params }: PageProps) {
  const schoolName = decodeURI(params.slug);
  const url = `http://localhost:8000/query?query=SELECT * FROM partner_unis WHERE university_name = '${schoolName}'`;
  const [school]: SchoolInfo[] = await (await fetch(url)).json();
  console.log(school);

  return (
    <main className="flex flex-col items-start pt-12 w-full max-w-5xl mx-auto">
      <h2 className="text-2xl">
        {school.university_name}&nbsp;|&nbsp;
        <Link href={`/countries/${school.university_country}`}>
          {school.university_country}
        </Link>
      </h2>
      <div>
        DESC HERE
        <br />
        {school.faculties_accepted}
      </div>
      <div className="mt-6">
        <h3>Find out more:</h3>
        <ul>
          {school.university_website.map((l) => (
            <li>
              <Link className="text-blue-700" href="l">
                {l}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
