import Head from 'next/head';
import Leaderboard from '../components/Leaderboard';

export default function Home() {
  return (
    <>
      <Head>
        <title>Coding Leaderboard</title>
        <meta name="description" content="Leaderboard for competitive programmers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <Leaderboard />
      </main>
    </>
  );
}