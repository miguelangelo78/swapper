import Image from 'next/image';

export type ButtonType = {
   buttonText: string,
   buttonLink: string,
   buttonStyle: string,
}

export const Hero = ({ title, description, buttons, imageUrl }: { title: string, description: string, buttons: ButtonType[], imageUrl: string }) => {
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="flex flex-row items-center w-full h-full">
        <div className="flex-1 text-left p-8">
          <div className="text-3xl font-bold mb-4">{title}</div>
          <p className="text-xl mb-4">{description}</p>
            <div className="flex">
               {buttons.map((button, index) => (
               <a key={index}
                  className={button.buttonStyle}
                  href={button.buttonLink}
               >
                  {button.buttonText}
               </a>
               ))}
            </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Image src={imageUrl} alt={title} width={300} height={300} />
        </div>
      </div>
    </section>
  );
};
