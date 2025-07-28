import SearchBar from './SearchBar';
import heroImage from '@/assets/hero-workers.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Find Skilled Workers
              <span className="block text-accent">Near You</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Connect with verified professionals across Nigeria. No signup needed. Contact workers directly.
            </p>
          </div>
          
          {/* Search Bar */}
          <SearchBar />
          
          {/* Quick Stats */}
          <div className="flex justify-center items-center space-x-8 mt-8 text-white/90">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-sm">500+ Verified Workers</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-sm">All 36 States Covered</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-sm">Direct Contact</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;