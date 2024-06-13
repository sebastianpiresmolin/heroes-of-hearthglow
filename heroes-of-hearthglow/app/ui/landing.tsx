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
                <div className="absolute mt-[45vh] top-0 left-0 w-full flex flex-col items-center justify-center z-10">
                    <Image
                        src="/stardewlogo.webp"
                        width={1000}
                        height={472}
                        alt="Landing page"
                        className="w-1/3"
                    />
                    <a href="https://www.youtube.com" className="text-4xl font-bold text-gray-500 mt-20 bg-blue-200 p-6 rounded-3xl">
                        WATCH TRAILER
                    </a>
                </div>
            </div>
        </section>
    );
};