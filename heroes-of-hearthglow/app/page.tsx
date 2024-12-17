import Landing from './ui/landing';
import Navigation from './ui/navigation';
import Wishlist from './ui/wishlist';
import Hero from './ui/hero';
import LatestNews from './ui/latest-news';
import Team from './ui/team';
import Footer from './ui/footer';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Navigation />
      <Landing />
      <Hero />
      <Wishlist />
      <LatestNews />
      <Wishlist />
      <Team />
      <Wishlist />
      <Footer />
    </div>
  );
}
