import Image from 'next/image';

export type ButtonType = {
  buttonText: string,
  buttonLink: string,
  buttonStyle: string,
}

export const Hero = ({ title, description, buttons, imageUrl }: { title: string, description: string, buttons: ButtonType[], imageUrl: string }) => {
  return (
    <section className="container mx-auto flex flex-col md:flex-row items-center justify-center min-h-screen p-4">
      <div className="flex-1 text-left md:text-center mb-8 md:mb-0">
        <div className="text-3xl font-bold mb-4">{title}</div>
        <p className="text-xl mb-4">{description}</p>
        <div className='items-center'>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            {buttons.map((button, index) => (
              <a key={index}
                className={`${button.buttonStyle} sm:px-16`}
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
          <Image src={imageUrl} alt={title} layout='fill' />
        </div>
      </div>
    </section>
  );
};
