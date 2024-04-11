import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Swapper - Home</title>
      </Head>

      <header className="p-4 bg-[#FFF3DA]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Swapper</div>
          <div>
            <Link href="/login" className="mr-4 p-2 bg-[#DFCCFB] rounded-lg">Login</Link>
            <Link href="/signup" className="mr-4 p-2 bg-[#DFCCFB] rounded-lg">Signup</Link>
          </div>
        </div>
      </header>

      <main className="flex flex-col flex-grow">
        <section className="bg-[#DFCCFB] text-center p-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Swapper</h1>
          <p className="text-xl">Helping you connect with teachers in Thailand for smooth school transitions.</p>
        </section>

        <section className="bg-[#D0BFFF] text-center p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">The problem Swapper solves</h2>
            <p className="text-lg">Swapper helps teachers in Thailand connect with each other to share details on moving schools.</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg">Create an account, browse teacher profiles, and start connecting to plan your next move.</p>
          </div>
        </section>

        <section className="flex-grow bg-[#BEADFA] text-center p-8 flex flex-col justify-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <div className="flex justify-center">
              <Link href="/signup" className="mr-4 p-2 bg-white rounded-lg text-lg font-medium">Signup</Link>
              <Link href="/signup" className="mr-4 p-2 bg-white rounded-lg text-lg font-medium">Login</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#DFCCFB] p-4 text-center">
        <p className="text-lg">&copy; 2024 Swapper. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
