import { Hero } from '@/components/Hero';
import Layout from '@/components/Layout';
import { NextPage } from 'next';
import Link from 'next/link';
import smartphoneMockup from './resources/images/mockup/smartphone_mockup.png'

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
            buttonStyle: 'mr-4 py-2 px-4 bg-primary text-tertiary rounded-lg text-lg font-medium'
          },
          {
            buttonText: 'Learn more',
            buttonLink: '#learnmore',
            buttonStyle: 'mr-4 py-2 px-4 bg-tertiary text-primary rounded-lg text-lg font-medium'
          },
        ]}
        imageUrl={smartphoneMockup.src}
      />

      <section id="learnmore" className="bg-primary text-center text-tertiary p-8">
        <div className="mb-16">
          <h2 className="text-4xl font-bold p-10">What is Swapper</h2>
          <p className="text-lg">Swapper helps teachers in Thailand connect with each other to share details on moving schools.</p>
        </div>

        <div className="mb-10">
          <h2 className="text-4xl font-bold mb-4">How it Works</h2>
          <div>
            <div className="flex space-x-3">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 border-b border-secondary pb-2">Step 1</h3>
                <p className="text-base">Create an account and fill in your details.</p>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 border-b border-secondary pb-2">Step 2</h3>
                <p className="text-base">Find teachers in your area and connect with them.</p>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 border-b border-secondary pb-2">Step 3</h3>
                <p className="text-base">Share details on your school and help each other out.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-grow bg-tertiary text-center p-20 flex flex-col justify-center">
        <div>
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <div className="flex justify-center">
            <Link href="/signup" className="mr-4 px-4 py-2 bg-primary text-tertiary rounded-lg text-lg font-medium shadow-md">Sign Up</Link>
            <Link href="/login" className="mr-4 px-4 py-2 bg-primary text-tertiary rounded-lg text-lg font-medium shadow-md">Login</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
