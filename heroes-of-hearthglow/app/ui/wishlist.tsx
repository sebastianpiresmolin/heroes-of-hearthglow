import Link from 'next/link';
import Image from 'next/image';

export default function Wishlist() {
  return (
    <div className="w-full h-full bg-black flex justify-center items-center pb-14 pt-14">
      <div className="flex justify-center items-center max-w-[1050px] overflow-hidden">
        <Image
          width={244}
          height={5}
          src="/wishlist_bar.png"
          alt="section divider"
          className="w-[20vw] h-1/3 opacity-30"
        />
        <div className="flex flex-col justify-center items-center mt-20 mb-20">
          <h2 className="font-bold text-3xl text-amber-400 m-1 text-nowrap mb-4">
            Wishlist Now
          </h2>
          <Image
            className="w-2/3 m-0 rounded-lg max-w-[1000px]"
            width={512}
            height={155}
            src="/steam_logo.png"
            alt="Steam store link"
          />
        </div>
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
