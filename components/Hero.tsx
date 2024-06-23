import Image from 'next/image';

export type ButtonType = {
  buttonText: string,
  buttonLink: string,
  buttonStyle: string,
}

export const Hero = ({ title, description, buttons, imageUrl }: { title: string, description: string, buttons: ButtonType[], imageUrl: string }) => {
  return (
    <div className='hero'>
      <section className="container mx-auto flex flex-col md:flex-row items-center justify-center min-h-screen p-4 sm:mt-20 md:mt-0">
        <div className="hero-header flex-1 text-left md:text-center space-x-10">
          <div>
            <div className="hero-title text-4xl font-bold mb-4">{title}</div>
            <p className="text-xl mb-4">{description}</p>
          </div>
          <div className='items-center'>
            <div className="flex flex-col sm:flex-row items-center justify-center md:space-y-0 md:space-x-4">
              {buttons.map((button, index) => (
                <a key={index}
                  className={`${button.buttonStyle} my-2 sm:px-16`}
                  href={button.buttonLink}
                >
                  {button.buttonText}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="relative hero-image">
            <Image src={imageUrl} alt={title} width={500} height={600} />
          </div>
        </div>
      </section>
    </div>
  );
};
