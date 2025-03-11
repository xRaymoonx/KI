import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";

// Dynamisches Importieren für bessere Performance (Lazy Loading)
const JobList = dynamic(() => import("../components/JobList"), { ssr: false });

const Home: NextPage = () => {
  return (
    <>
      {/* Meta-Daten für SEO */}
      <Head>
        <title>Hyperlokale Job-App</title>
        <meta name="description" content="Finde kurzfristige Jobs in deiner Nähe in Echtzeit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hauptinhalt */}
      <main className={styles.main}>
        <h1>Finde kurzfristige Jobs in deiner Nähe</h1>
        <p>Unsere KI hilft dir, den perfekten Job zu finden.</p>

        {/* Dynamisch geladene Jobliste */}
        <JobList />
      </main>
    </>
  );
};

export default Home;