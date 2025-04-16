
import { Share2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface EventActionsProps {
  eventTitle: string;
}

const EventActions = ({ eventTitle }: EventActionsProps) => {
  const navigate = useNavigate();

  const handleShareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: eventTitle,
        text: `Check out this event: ${eventTitle}`,
        url: window.location.href,
      })
      .catch(error => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Event link copied to clipboard",
      });
    }
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <button 
        onClick={() => navigate('/events')}
        className="flex items-center text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to all events
      </button>
      
      <button
        onClick={handleShareEvent}
        className="flex items-center text-gray-600 hover:text-primary"
      >
        <Share2 className="h-4 w-4 mr-1" />
        Share Event
      </button>
    </div>
  );
};

export default EventActions;
