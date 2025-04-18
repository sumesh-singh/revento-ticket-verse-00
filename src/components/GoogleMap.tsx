
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, ZoomIn, ZoomOut } from 'lucide-react';

interface GoogleMapProps {
  location: string;
  className?: string;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const GoogleMap: React.FC<GoogleMapProps> = ({ location, className }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAzrm-IgBr3kTxVudj_Sl54anP9NuUl9cs&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    window.initMap = initializeMap;
    loadGoogleMaps();

    return () => {
      window.initMap = () => {};
    };
  }, [location]);

  const initializeMap = async () => {
    if (!mapRef.current) return;

    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const position = results[0].geometry.location;
        
        map.current = new google.maps.Map(mapRef.current, {
          center: position,
          zoom: 15,
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry',
              stylers: [{ color: '#242f3e' }]
            },
            {
              featureType: 'all',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#242f3e' }]
            },
            {
              featureType: 'all',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#746855' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#17263c' }]
            }
          ],
          mapTypeControl: false,
          fullscreenControl: false
        });

        marker.current = new google.maps.Marker({
          map: map.current,
          position,
          animation: google.maps.Animation.DROP,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#3b82f6',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          }
        });

        const infowindow = new google.maps.InfoWindow({
          content: `<div class="p-2"><strong>${location}</strong></div>`
        });

        marker.current.addListener('click', () => {
          infowindow.open(map.current, marker.current);
        });
      }
    });
  };

  const handleZoomIn = () => {
    if (map.current) {
      map.current.setZoom(map.current.getZoom() + 1);
    }
  };

  const handleZoomOut = () => {
    if (map.current) {
      map.current.setZoom(map.current.getZoom() - 1);
    }
  };

  const handleCenterLocation = () => {
    if (map.current && marker.current) {
      map.current.panTo(marker.current.getPosition()!);
    }
  };

  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      <div ref={mapRef} className="w-full h-[400px]" />
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomIn}
          className="bg-white/90 hover:bg-white"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleZoomOut}
          className="bg-white/90 hover:bg-white"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleCenterLocation}
          className="bg-white/90 hover:bg-white"
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default GoogleMap;
