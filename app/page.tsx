import { Hero } from '@/components/Hero';
import Layout from '@/components/Layout';
import { NextPage } from 'next';
import Link from 'next/link';
import smartphoneMockup from './resources/images/mockup/smartphone_mockup.png'
import Separator from '@/components/SeparatorComponent';

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero 
        title="A better way to find Teachers in Thailand" 
        description="We help you connect with teachers in Thailand for smooth school transitions."
        buttons={[
          {
            buttonText: 'Get started',
            buttonLink: '/signup',
            buttonStyle: 'mr-4 p-2 primary text-white rounded-lg text-lg font-medium'
          },
          {
            buttonText: 'Learn more',
            buttonLink: '#learnmore',
            buttonStyle: 'mr-4 p-2 bg-white rounded-lg text-lg font-medium'
          },
        ]}
        imageUrl={smartphoneMockup.src}
      />

      <Separator />

      <section id="learnmore" className="primary text-center p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">What is Swapper</h2>
          <p className="text-lg text-white ">Swapper helps teachers in Thailand connect with each other to share details on moving schools.</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-lg text-white ">Create an account, browse teacher profiles, and start connecting to plan your next move.</p>
        </div>
      </section>

      <section className="flex-grow tertiary text-center p-8 flex flex-col justify-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <div className="flex justify-center">
            <Link href="/signup" className="mr-4 p-2 bg-white rounded-lg text-lg font-medium">Signup</Link>
            <Link href="/login" className="mr-4 p-2 bg-white rounded-lg text-lg font-medium">Login</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
