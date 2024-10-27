const { default: Image } = require("next/image");

function HeroSection(){
    return(
        <div className="w-full h-auto">
            <div className="w-full">
                <Image
                    src="/Hero1.jpeg"
                    layout="responsive"   
                    width={1000}          
                    height={500}          
                    quality={100}         
                    alt="herosection"
                />
            </div>
            <div>
             
            </div>
        </div>
    )
}

export default HeroSection;
