import Image from "next/image";

function HeroSection({
  imageSrc = "/Hero-poster1.jpg",
  title = "Movie Title",
}) {
  return (
    <section className="relative w-full">
      {/* Hero Container */}
      <div className="relative w-full aspect-[21/9] xs:aspect-[16/9] sm:aspect-[21/9] lg:aspect-[21/6]">
        {/* Background Image */}
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          className="object-cover brightness-75"
          sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 100vw,
                           100vw"
          quality={100}
        />
      </div>
    </section>
  );
}

export default HeroSection;
