import HomeCarousel from './HomeCarousel';
import HotelsList from './HotelsList';

const HomePage = () => {
  return (
    <div className="container mx-auto text-center">
      <HomeCarousel />
      <HotelsList />
    </div>
  );
};

export default HomePage;
