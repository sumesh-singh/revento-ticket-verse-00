
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Navigation, Bus, SquareParking } from 'lucide-react';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onCenter: () => void;
  onToggleTransit: () => void;
}

const MapControls = ({
  onZoomIn,
  onZoomOut,
  onCenter,
  onToggleTransit
}: MapControlsProps) => {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
      <Button
        variant="secondary"
        size="icon"
        onClick={onZoomIn}
        className="bg-white/90 hover:bg-white"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={onZoomOut}
        className="bg-white/90 hover:bg-white"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={onCenter}
        className="bg-white/90 hover:bg-white"
      >
        <Navigation className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={onToggleTransit}
        className="bg-white/90 hover:bg-white"
      >
        <Bus className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="bg-white/90 hover:bg-white"
      >
        <SquareParking className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MapControls;
