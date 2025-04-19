
import { useEffect, useRef, useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { getMapStyles } from '@/utils/mapStyles';

interface UseGoogleMapProps {
  location: string;
  interactive?: boolean;
  onLocationSelect?: (placeId: string, coordinates: {lat: number, lng: number}) => void;
}

export const useGoogleMap = ({ 
  location,
  interactive = false,
  onLocationSelect
}: UseGoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const transitLayer = useRef<google.maps.TransitLayer | null>(null);
  const searchBox = useRef<google.maps.places.SearchBox | null>(null);
  
  const [isInteractive, setIsInteractive] = useState(interactive);
  const [locationCallback, setLocationCallback] = useState<((placeId: string, coordinates: {lat: number, lng: number}) => void) | undefined>(onLocationSelect);

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
        setupInteractivity();
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

  const setupInteractivity = () => {
    if (!map.current || !isInteractive) return;
    
    // Setup click listener for interactive map
    map.current.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (!map.current || !e.latLng) return;
      
      // Update marker position
      if (marker.current) {
        marker.current.setPosition(e.latLng);
      } else {
        marker.current = new google.maps.Marker({
          position: e.latLng,
          map: map.current,
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
      }
      
      // Get place details from coordinates
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: e.latLng.toJSON() }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const placeId = results[0].place_id;
          const coordinates = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          };
          
          // Call callback if provided
          if (locationCallback && placeId) {
            locationCallback(placeId, coordinates);
          }
        }
      });
    });
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

  // Exposed method to update interactive state
  const setInteractive = useCallback((value: boolean) => {
    setIsInteractive(value);
  }, []);

  // Exposed method to update callback
  const setLocationSelectCallback = useCallback((callback: (placeId: string, coordinates: {lat: number, lng: number}) => void) => {
    setLocationCallback(() => callback);
  }, []);

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
      // Fix the 'remove' method that doesn't exist on Map
      if (map.current) {
        // Just set to null instead of calling remove
        map.current = null;
      }
    };
  }, [location]);

  return {
    mapRef,
    zoomIn,
    zoomOut,
    centerLocation,
    toggleTransitLayer,
    setInteractive,
    setLocationSelectCallback
  };
};
