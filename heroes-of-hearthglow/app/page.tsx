import Landing from './ui/landing';
import Navigation from './ui/navigation';
import Wishlist from './ui/wishlist';

export default function Home() {
  return (
    <div>
      <Navigation />
      <Landing />
      <Wishlist />
    </div>
  );
}
