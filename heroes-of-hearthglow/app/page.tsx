import Landing from './ui/landing';
import Navigation from './ui/navigation';
import Wishlist from './ui/wishlist';
import Hero from './ui/hero';
import LatestNews from './ui/latest-news';
import Carousel from './ui/carousel';

export default function Home() {
  return (
    <div>
      <Navigation />
      <Landing />
      <Hero />
      <Carousel />
      <Wishlist />
      <LatestNews />
      <Wishlist />

    </div>
  );
}
