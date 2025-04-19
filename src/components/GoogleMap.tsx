
import React from 'react';
import { useGoogleMap } from '@/hooks/useGoogleMap';
import MapControls from './map/MapControls';

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
  const {
    mapRef,
    zoomIn,
    zoomOut,
    centerLocation,
    toggleTransitLayer
  } = useGoogleMap({ location });

  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      <div ref={mapRef} className="w-full h-[400px] ticket-map" />
      <MapControls
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onCenter={centerLocation}
        onToggleTransit={toggleTransitLayer}
      />
    </div>
  );
};

export default GoogleMap;
