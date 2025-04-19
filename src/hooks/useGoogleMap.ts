
import { useEffect, useRef } from 'react';
import { toast } from '@/hooks/use-toast';

interface UseGoogleMapProps {
  location: string;
}

export const useGoogleMap = ({ location }: UseGoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const transitLayer = useRef<google.maps.TransitLayer | null>(null);

  const initializeMap = async () => {
    if (!mapRef.current) return;

    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const position = results[0].geometry.location;
        
        map.current = new google.maps.Map(mapRef.current, {
          center: position,
          zoom: 15,
          styles: getMapStyles(),
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

        setupInfoWindow();
        setupServices();
      } else {
        console.error('Geocode was not successful:', status);
        toast({
          title: "Map Error",
          description: `Could not find location: ${location}`,
          variant: "destructive",
        });
      }
    });
  };

  const setupInfoWindow = () => {
    if (!marker.current || !map.current) return;

    const infowindow = new google.maps.InfoWindow({
      content: `<div class="p-2"><strong>${location}</strong></div>`
    });

    marker.current.addListener('click', () => {
      infowindow.open(map.current, marker.current);
    });
  };

  const setupServices = () => {
    if (!map.current) return;

    placesService.current = new google.maps.places.PlacesService(map.current);
    transitLayer.current = new google.maps.TransitLayer();
  };

  const zoomIn = () => {
    if (map.current) {
      map.current.setZoom(map.current.getZoom() + 1);
    }
  };

  const zoomOut = () => {
    if (map.current) {
      map.current.setZoom(map.current.getZoom() - 1);
    }
  };

  const centerLocation = () => {
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
      map.current?.remove();
    };
  }, [location]);

  return {
    mapRef,
    zoomIn,
    zoomOut,
    centerLocation,
    toggleTransitLayer
  };
};
