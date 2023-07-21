import Link from "next/link";
import DisqusComments from "@/components/DisqusComments";
import UniversityAvailability from "@/components/UniversityAvailability";

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
  sem1_months: string[];
  sem2_months: string[];
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
          <div className="flex flex-row w-full mt-4 border rounded-lg px-4 py-3 pb-6">
            <div className="w-1/2 pr-4">
              <h3 className="text-xl font-semibold">Description</h3>
              {school.gpt_university_description}
            </div>
            <div className="w-1/2">
              <h3 className="text-xl font-semibold">School Calendar</h3>
              <UniversityAvailability sem1_months={school.sem1_months} sem2_months={school.sem2_months} />
            </div>

          </div>

          <div className="w-full mt-4 border rounded-lg px-4 py-3">
            <div>
              {school.faculties_accepted.length > 0 && (
                <div>
                  <h3>Suitable for Faculties:</h3>
                </div>
              )}
              <ul className="list-disc list-inside mb-4">
                {school.faculties_accepted.map((f) => (
                  <li>{f}</li>
                ))}{" "}
              </ul>
            </div>
            <div className="">
              <h3>Find out more:</h3>
              <ul className="list-disc list-inside">
                {school.university_website.map((l) => (
                  <li>
                    <Link className="text-blue-700" href={l}>
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        <div className="mt-6">
          <h2 className="text-2xl">
            Fast facts about <b>{school.gpt_university_city}</b>:
          </h2>
          <div className="flex flex-col w-full mt-4 border rounded-lg px-4 py-3">
            <div className="w-full">
              {school.gpt_location_description}
            </div>
            <div className="flex flex-row mt-4">
              <div className="w-1/2 pr-4">
                <h4 className="text-lg font-semibold">Safety</h4>
                <p>
                  {school.gpt_location_crime}
                </p>
              </div>
              <div className="w-1/2">
                <h4 className="text-lg font-semibold">Cost of living</h4>
                <p>
                  {school.gpt_location_cost_of_living}
                </p>
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className="w-1/2 pr-4">
                <h4 className="text-lg font-semibold">Weather</h4>
                <p>
                  {school.gpt_location_weather}
                </p>
              </div>
              <div className="w-1/2">
                <h4 className="text-lg font-semibold">Transportation</h4>
                <p>
                  {school.gpt_location_transportation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="comments" className="w-full">
        <div className="text-2xl my-6 font-semibold">Discussion</div>
        <DisqusComments id={schoolName} slug={params.slug} title={schoolName} />
      </div>
    </main>
  );
}
