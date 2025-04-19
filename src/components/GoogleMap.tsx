
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, ZoomIn, ZoomOut, Parking, Bus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface GoogleMapProps {
  location: string;
  className?: string;
}

// Add Google Maps types
declare global {
  interface Window {
    initMap: () => void;
  }
}

const GoogleMap: React.FC<GoogleMapProps> = ({ location, className }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const transitLayer = useRef<google.maps.TransitLayer | null>(null);
  const directionsService = useRef<google.maps.DirectionsService | null>(null);
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAzrm-IgBr3kTxVudj_Sl54anP9NuUl9cs&libraries=places&callback=initMap`;
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
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{ color: '#2f3948' }]
            },
            {
              featureType: 'poi',
              elementType: 'labels.icon',
              stylers: [{ visibility: 'on' }]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{ color: '#263c3f' }]
            },
            {
              featureType: 'poi.business',
              stylers: [{ visibility: 'on' }]
            },
            {
              featureType: 'poi.attraction',
              stylers: [{ visibility: 'on' }]
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

        // Initialize places service
        if (map.current) {
          placesService.current = new google.maps.places.PlacesService(map.current);
          
          // Show nearby parking
          findNearbyPlaces(position, 'parking');
          
          // Initialize transit layer
          transitLayer.current = new google.maps.TransitLayer();
          
          // Initialize directions service
          directionsService.current = new google.maps.DirectionsService();
          directionsRenderer.current = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: '#3b82f6',
              strokeWeight: 5,
              strokeOpacity: 0.7
            }
          });
          
          if (directionsRenderer.current) {
            directionsRenderer.current.setMap(map.current);
          }
        }
      } else {
        console.error('Geocode was not successful for the following reason:', status);
        toast({
          title: "Map Error",
          description: `Could not find location: ${location}`,
          variant: "destructive",
        });
      }
    });
  };

  const findNearbyPlaces = (position: google.maps.LatLng, type: string) => {
    if (!placesService.current || !map.current) return;
    
    const request = {
      location: position,
      radius: 500,
      type: type
    };
    
    placesService.current.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        results.forEach(place => {
          if (place.geometry && place.geometry.location) {
            const placeMarker = new google.maps.Marker({
              map: map.current,
              position: place.geometry.location,
              icon: {
                url: type === 'parking' 
                  ? 'https://maps.google.com/mapfiles/ms/icons/parkinglot.png' 
                  : 'https://maps.google.com/mapfiles/ms/icons/bus.png',
                scaledSize: new google.maps.Size(24, 24)
              },
              title: place.name
            });
            
            const infoContent = `
              <div class="p-2">
                <strong>${place.name || type}</strong>
                ${place.vicinity ? `<p>${place.vicinity}</p>` : ''}
                ${place.rating ? `<p>Rating: ${place.rating} ⭐</p>` : ''}
              </div>
            `;
            
            const infowindow = new google.maps.InfoWindow({
              content: infoContent
            });
            
            placeMarker.addListener('click', () => {
              infowindow.open(map.current, placeMarker);
            });
          }
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
  
  const toggleTransitLayer = () => {
    if (!transitLayer.current || !map.current) return;
    
    if (transitLayer.current.getMap()) {
      transitLayer.current.setMap(null);
      toast({
        title: "Transit Layer Disabled",
        description: "Public transportation stops are now hidden",
      });
    } else {
      transitLayer.current.setMap(map.current);
      toast({
        title: "Transit Layer Enabled",
        description: "Public transportation stops are now visible",
      });
    }
  };

  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      <div ref={mapRef} className="w-full h-[400px] ticket-map" />
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
        <Button
          variant="secondary"
          size="icon"
          onClick={toggleTransitLayer}
          className="bg-white/90 hover:bg-white"
        >
          <Bus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default GoogleMap;
