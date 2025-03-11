import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import Script from "next/script";
import Link from "next/link";

const JobList = dynamic(() => import("../components/JobList"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-3xl mt-6 p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
      <p className="text-gray-500 text-lg">Jobs werden geladen...</p>
      <div className="animate-pulse h-5 w-3/4 bg-gray-300 rounded mt-2"></div>
    </div>
  ),
});

const Home: NextPage = () => {
  const fullUrl = typeof window !== "undefined" ? window.location.href : "";
  const datePosted = new Date().toISOString().split("T")[0];

  const jobPostingData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": "Kurzfristige Jobs in deiner Nähe",
    "description": "Finde kurzfristige Jobs in deiner Nähe mit unserer KI-gestützten Plattform.",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Hyperlokale Job-App",
      "url": fullUrl
    },
    "employmentType": ["PART_TIME", "TEMPORARY"],
    "datePosted": datePosted,
    "validThrough": "2025-12-31",
    "jobLocationType": "TELECOMMUTE",
    "directApply": true
  };

  return (
    <>
      <Head>
        <title>Finde kurzfristige Jobs in deiner Nähe | Hyperlokale Job-App</title>
        <meta name="description" content="Nutze unsere KI, um blitzschnell die besten kurzfristigen Jobs in deiner Nähe zu finden. Jetzt entdecken!" />
        <meta property="og:url" content={fullUrl} />
      </Head>

      <Script type="application/ld+json">
        {JSON.stringify(jobPostingData)}
      </Script>

      <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
          Finde kurzfristige Jobs in deiner Nähe
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-2 text-center">
          Unsere KI hilft dir, den perfekten Job zu finden – sofort und unkompliziert.
        </p>

        <Link href="/signup">
          <a className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Jetzt anmelden & sofort Jobs finden!
          </a>
        </Link>

        <div className="mt-6 w-full max-w-3xl bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg">
          <p className="text-lg font-semibold">🔥 Mehr Jobs, mehr Chancen!</p>
          <p className="text-gray-700">Mit unserer <span className="font-bold">Premium-Mitgliedschaft</span> wirst du bevorzugt vermittelt.</p>
          <Link href="/premium">
            <a className="mt-2 inline-block px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md shadow-md hover:bg-yellow-600 transition">
              Jetzt Premium testen!
            </a>
          </Link>
        </div>

        <div className="mt-6 w-full max-w-3xl bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold">📢 Über 10.000 Nutzer haben schon Jobs gefunden!</p>
          <div className="flex space-x-4 mt-2">
            <div className="bg-white p-3 rounded-lg shadow-md">
              <p className="text-gray-700">„Dank dieser App habe ich in einem Tag einen Job gefunden!“ – <strong>Lisa, 24</strong></p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-md">
              <p className="text-gray-700">„Super einfach & direkt bezahlt – 5 Sterne!“ – <strong>Marc, 29</strong></p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;