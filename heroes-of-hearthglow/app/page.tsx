import Landing from './ui/landing';
import Navigation from './ui/navigation';
import Wishlist from './ui/wishlist';
import Hero from './ui/hero';
import Youtube from './ui/youtube';
import LatestNews from './ui/latest-news';

export default function Home() {
  return (
    <div>
      <Navigation />
      <Landing />
      <Hero />
      <Youtube />
      <Wishlist />
      <LatestNews />
    </div>
  );
}
