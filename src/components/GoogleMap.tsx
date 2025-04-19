
import React from 'react';
import { useGoogleMap } from '@/hooks/useGoogleMap';
import MapControls from '@/components/map/MapControls';

interface GoogleMapProps {
  location: string;
  className?: string;
  interactive?: boolean;
  onLocationSelect?: (placeId: string, coordinates: {lat: number, lng: number}) => void;
}

const GoogleMap = ({ 
  location, 
  className = 'w-full h-[300px]',
  interactive = false,
  onLocationSelect
}: GoogleMapProps) => {
  const { 
    mapRef, 
    zoomIn, 
    zoomOut, 
    centerLocation, 
    toggleTransitLayer,
    setInteractive,
    setLocationSelectCallback
  } = useGoogleMap({ 
    location,
    interactive,
    onLocationSelect
  });

  // Set interactive mode and callback whenever props change
  React.useEffect(() => {
    setInteractive(interactive);
    if (onLocationSelect) {
      setLocationSelectCallback(onLocationSelect);
    }
  }, [interactive, onLocationSelect, setInteractive, setLocationSelectCallback]);

  return (
    <div className={`relative rounded-md overflow-hidden ${className}`}>
      <div ref={mapRef} className="absolute inset-0"></div>
      
      <MapControls
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onCenter={centerLocation}
        onToggleTransit={toggleTransitLayer}
      />
      
      {interactive && (
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm py-1 px-3 rounded-md text-xs text-gray-700">
          Click on map to set location
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
