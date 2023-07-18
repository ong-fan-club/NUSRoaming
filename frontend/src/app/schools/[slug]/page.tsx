import Link from "next/link";
import DisqusComments from "@/components/DisqusComments";

interface PageProps {
  params: {
    slug: string;
  };
}

interface SchoolInfo {
  university_name: string;
  university_website: string[];
  university_country: string;
  faculties_accepted: string[];
  module_restrictions: string;
  visa_info: string;
  sem_1_months: string[];
  sem_2_months: string[];
  gpt_university_description: string;
  gpt_university_address: string;
  gpt_university_city: string;
  gpt_nearest_airport: string;
  gpt_location_cost_of_living: string;
  gpt_location_weather: string;
  gpt_location_description: string;
  gpt_location_crime: string;
  gpt_location_transportation: string;
}

export default async function Page({ params }: PageProps) {
  const schoolName = decodeURI(params.slug);
  const url = `http://localhost:8000/partner_unis/partner_uni/${schoolName}`;
  const [school]: SchoolInfo[] = await (await fetch(url)).json();

  return (
    <main className="flex flex-col items-start mb-10 w-full max-w-5xl mx-auto px-6">
      <div id="info" className="py-10">
        <h2 className="text-2xl">
          <b>
            {school.university_name}&nbsp;|&nbsp;
            <Link href={`/countries/${school.university_country}`}>
              {school.university_country}
            </Link>
          </b>
        </h2>
        <div>
          {school.gpt_university_description}
          <br />
          <br />
          {school.faculties_accepted.length > 0 && (
            <h3>Suitable for Faculties:</h3>
          )}

          <ul className="list-disc list-inside">
            {school.faculties_accepted.map((f) => (
              <li>{f}</li>
            ))}{" "}
          </ul>
          <div className="mt-6">
            <h3>Find out more:</h3>
            <ul className="list-disc list-inside">
              {school.university_website.map((l) => (
                <li>
                  <Link className="text-blue-700" href="l">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl">
            Fast facts about <b>{school.gpt_university_city}</b>:
          </h2>
          <br />
          <ul>
            <li>{school.gpt_location_description}</li>
            <br />
            <li>
              <b>Safety: </b>
              {school.gpt_location_crime}
            </li>
            <li>
              <b>Cost of Living: </b>
              {school.gpt_location_cost_of_living}
            </li>
            <li>
              <b>Weather: </b>
              {school.gpt_location_weather}
            </li>
            <li>
              <b>Transportation: </b>
              {school.gpt_location_transportation}
            </li>
          </ul>
        </div>
      </div>
      <div id="comments" className="w-full">
        <div className="text-2xl my-6 font-semibold">Discussion</div>
        <DisqusComments id={schoolName} slug={params.slug} title={schoolName} />
      </div>
    </main>
  );
}
