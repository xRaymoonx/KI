import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import Script from "next/script";
import styles from "../styles/Home.module.css";

// Dynamisches Importieren mit optimierter Ladeanzeige
const JobList = dynamic(() => import("../components/JobList"), {
  loading: () => (
    <div className="w-full max-w-3xl mt-6 p-4 bg-white rounded-lg shadow-md">
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  ),
});

const Home: NextPage = () => {
  return (
    <>
      {/* SEO- und Performance-Optimierung */}
      <Head>
        <title>Hyperlokale Job-App | Finde kurzfristige Jobs</title>
        <meta name="description" content="Finde kurzfristige Jobs in deiner Nähe in Echtzeit. Unsere KI hilft dir dabei, den perfekten Job zu finden." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Hyperlokale Job-App | Jobs in Echtzeit" />
        <meta property="og:description" content="Schnell & einfach Jobs in deiner Nähe finden – jetzt ausprobieren!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://deine-domain.com" />
        <meta property="og:image" content="https://deine-domain.com/images/preview.jpg" />
        <meta property="og:image:alt" content="Vorschau der Hyperlokalen Job-App" />
        <meta name="robots" content="index, follow" />
        <link rel="preload" href="/fonts/custom-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Head>

      {/* Strukturierte Daten für bessere SEO */}
      <Script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": "Kurzfristige Jobs in deiner Nähe",
          "description": "Finde kurzfristige Jobs in deiner Nähe mit unserer KI-gestützten Plattform.",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Hyperlokale Job-App",
            "url": "https://deine-domain.com"
          },
          "employmentType": ["PART_TIME", "TEMPORARY"],
          "applicantLocationRequirements": {
            "@type": "Country",
            "name": "Deutschland"
          },
          "datePosted": new Date().toISOString().split("T")[0],
          "validThrough": "2025-12-31"
        })}
      </Script>

      {/* Hauptinhalt */}
      <main className={styles.main}>
        <h1 className="text-3xl font-bold text-gray-800 text-center" alt="Job-App Titel">
          Finde kurzfristige Jobs in deiner Nähe
        </h1>
        <p className="text-gray-600 text-center" alt="Job-App Beschreibung">
          Unsere KI hilft dir, den perfekten Job zu finden.
        </p>

        {/* Verhindert Layout Shift */}
        <div className="min-h-[50vh] flex justify-center items-center">
          <JobList />
        </div>
      </main>
    </>
  );
};

export default Home;
