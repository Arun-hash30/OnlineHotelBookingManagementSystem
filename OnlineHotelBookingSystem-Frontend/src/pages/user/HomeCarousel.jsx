import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import h1 from "../../assets/h4.jpg";

function HomeCarousel() {
  return (
    <div className="relative w-full h-[75vh]">
      <Carousel
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        stopOnHover={false}
        transitionTime={1000}
        className="rounded-lg shadow-lg overflow-hidden h-full"
      >
        <div className="relative h-[75vh]">
          <img
            className="object-cover w-full h-full"
            src="https://cache.marriott.com/marriottassets/marriott/LASJW/lasjw-guestroom-0111-hor-clsc.jpg?interpolation=progressive-bilinear&"
            alt="H2"
          />
        </div>
        <div className="relative h-[75vh]">
          <img className="object-cover w-full h-full" src={h1} alt="H1" />
        </div>
        <div className="relative h-[75vh]">
          <img
            className="object-cover w-full h-full"
            src="https://photos.mandarinoriental.com/is/image/MandarinOriental/dmo-The-worlds-most-romantic-hotel-suites-dubai-royal-penthouse-bedroom"
            alt="H3"
          />
        </div>
      </Carousel>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <h2 className="text-5xl font-bold text-white mb-4">
          Find Your Best Stays
        </h2>
      </div>
    </div>
  );
}

export default HomeCarousel;
