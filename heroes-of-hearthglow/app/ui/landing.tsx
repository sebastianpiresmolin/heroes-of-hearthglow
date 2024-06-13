import Image from "next/image";

export default function Landing() {
    return (
        <Image
            src="/landing.jpg"
            width={2400}
            height={1642}
            alt="Landing page"
            className="w-screen h-screen"
        />
    )
}