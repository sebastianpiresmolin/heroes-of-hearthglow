import Link from 'next/link';
import Image from 'next/image';

export default function Wishlist() {
  return (
    <div className="w-full h-[100px] bg-gray-400 flex justify-center items-center">
      <div className="flex justify-center items-center max-w-[1050px]">
        <Image
          width={244}
          height={5}
          src="/wishlist_bar.png"
          alt="section divider"
          className="w-[20vw] h-1/3 opacity-30"
        />
        <h2 className="font-bold sm:text-xl md:text-2xl  m-5 text-nowrap">
          Wishlist Now
        </h2>
        <Image
          className="w-1/4 m-5 rounded-lg"
          width={512}
          height={155}
          src="/steam_logo.png"
          alt="Steam store link"
        />
        <Image
          width={244}
          height={5}
          src="/wishlist_bar.png"
          alt="section divider"
          className="w-[20vw] h-1/3 opacity-30"
        />
      </div>
    </div>
  );
}
