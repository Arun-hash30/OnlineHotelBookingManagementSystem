const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-10">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 lg:mb-0">
          <h3 className="text-xl font-bold mb-4">HotelBooking</h3>
          <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor felis a arcu scelerisque vestibulum.</p>
          <div className="mt-4">
            <a href="#" className="text-blue-400 hover:text-blue-600 mr-4">Facebook</a>
            <a href="#" className="text-blue-400 hover:text-blue-600 mr-4">Twitter</a>
            <a href="#" className="text-blue-400 hover:text-blue-600">Instagram</a>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 lg:mb-0">
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="text-sm">
            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Hotels</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Booking</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 lg:mb-0">
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-sm">123 Hotel Street, City, Country</p>
          <p className="text-sm">Email: info@hotelbooking.com</p>
          <p className="text-sm">Phone: +123 456 7890</p>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 lg:mb-0">
          <h3 className="text-xl font-bold mb-4">Newsletter</h3>
          <p className="text-sm mb-4">Subscribe to our newsletter for exclusive offers and updates.</p>
          <form className="flex">
            <input type="email" placeholder="Your email" className="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none" />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4">
        <p className="text-center text-sm">&copy; 2024 HotelBooking. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
