import Landing from './ui/landing';
import Navigation from './ui/navigation';
import Wishlist from './ui/wishlist';
import Hero from './ui/hero';

export default function Home() {
  return (
    <div>
      <Navigation />
      <Landing />
      <Wishlist />
      <Hero />
    </div>
  );
}
