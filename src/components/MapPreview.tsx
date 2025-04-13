
import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

const MapPreview = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current);
      }
    };
  }, []);

  // In a real implementation, this would be integrated with a mapping API like Google Maps or Mapbox
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Events Near You</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover upcoming events in your area with our interactive map
          </p>
        </div>

        <div 
          ref={mapRef}
          className="relative h-[450px] rounded-xl overflow-hidden shadow-lg animate-on-scroll"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10"></div>
          {/* This would be replaced with an actual map integration */}
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80" 
              alt="Map view" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Sample event pins */}
            <div className="absolute top-1/3 left-1/4 flex flex-col items-center animate-pulse-light">
              <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg">
                <MapPin size={20} />
              </div>
              <div className="mt-2 bg-white px-3 py-1 rounded-md shadow-md text-xs font-medium">
                Tech Conference
              </div>
            </div>
            
            <div className="absolute top-2/3 right-1/3 flex flex-col items-center animate-pulse-light" style={{animationDelay: "0.5s"}}>
              <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg">
                <MapPin size={20} />
              </div>
              <div className="mt-2 bg-white px-3 py-1 rounded-md shadow-md text-xs font-medium">
                Music Festival
              </div>
            </div>
            
            <div className="absolute bottom-1/4 right-1/4 flex flex-col items-center animate-pulse-light" style={{animationDelay: "1s"}}>
              <div className="h-10 w-10 bg-accent rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg">
                <MapPin size={20} />
              </div>
              <div className="mt-2 bg-white px-3 py-1 rounded-md shadow-md text-xs font-medium">
                Art Exhibition
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-6 right-6">
            <button className="btn-primary">View Full Map</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapPreview;
