import Image from "next/image";

export default function Landing() {
    return (
        <section className="relative w-full h-screen">
            <div className="relative w-full h-full">
                <Image
                    src="/landing.jpg"
                    width={2400}
                    height={1642}
                    alt="Landing page"
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                />
                <div className="absolute mt-[40vh] md:mt-[25vh] top-0 left-0 w-full flex flex-col items-center justify-center z-10">
                    <Image
                        src="/stardewlogo.webp"
                        width={1000}
                        height={472}
                        alt="Landing page"
                        className=" max-w-[350px] md:max-w-[500px] xl:max-w-[660px] "
                    />
                    <a href="https://www.youtube.com" className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-500 mt-10 bg-blue-200 p-4 md:p-6 rounded-3xl">
                        WATCH TRAILER
                    </a>
                    <h3 className="mt-20 text-lg font-bold text-gray-500">
                        ---- Scroll To Explore ----
                    </h3>
                </div>
            </div>
        </section>
    );
};