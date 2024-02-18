import HeroImage from "../assets/accueil/_4e119989-fe7f-4543-89f1-b43ddb61ea9f.jpg";
// import HeroImage2 from "../assets/accueil/_f53e3779-4541-4ecb-875b-f673fa1a5103.jpg";

const Hero = () => {
  return (
    <section
      className="w-full mx-auto bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right rounded mb-10"
      style={{
        maxWidth: "1600px",
        height: "32rem",
        backgroundImage: `url(${HeroImage})`,
      }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col w-full lg:w-1/2 justify-center items-start  px-6 tracking-wide">
          {/* <h1 className="text-black text-2xl my-4">Site Ecommerce</h1> */}
          {/* <a
            className="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
            href="#"
          >
            products
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
