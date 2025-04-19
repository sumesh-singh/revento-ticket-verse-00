import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, User, Upload, Save, PlusCircle, Info, HelpCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import GoogleMap from '@/components/GoogleMap';

const EventCreation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    endDate: '',
    endTime: '',
    location: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
    saleEnds: '',
    capacity: '',
    organizer: 'techevents',
    // Publishing options
    visibility: 'draft',
    enableRegistration: false,
    showOnHomepage: false,
    allowSocialSharing: false,
    // Additional settings
    collectAttendeeDetails: true,
    sendConfirmationEmails: true,
    enableWaitlist: false,
    // Location coordinates
    placeId: '',
    coordinates: {
      lat: 40.7128, // Default to NYC
      lng: -74.0060
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const locationInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, visibility: e.target.value });
  };

  const handleSaveDraft = () => {
    submitEvent('draft');
  };

  const handlePublish = () => {
    submitEvent('published');
  };

  const handleLocationSelect = () => {
    if (!formData.location.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter a location before selecting on map",
        variant: "destructive",
      });
      return;
    }
    
    setShowLocationPicker(true);
  };

  const handleMapLocationUpdate = (placeId: string, coordinates: { lat: number, lng: number }) => {
    setFormData({
      ...formData,
      placeId,
      coordinates
    });
    
    toast({
      title: "Location Updated",
      description: "Map location has been set successfully",
    });
    
    setShowLocationPicker(false);
  };

  const submitEvent = (status: string) => {
    if (!formData.title) {
      toast({
        title: "Missing Information",
        description: "Please provide an event title before continuing.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would save this to a database
      const newEvent = {
        ...formData,
        id: Date.now(),
        status,
        salesCount: 0,
        viewCount: 0,
        image: "/placeholder.svg",
        createdAt: new Date().toISOString()
      };

      // Get existing events from localStorage or create empty array
      const existingEvents = JSON.parse(localStorage.getItem('organizer_events') || '[]');
      
      // Add new event
      localStorage.setItem('organizer_events', JSON.stringify([newEvent, ...existingEvents]));

      toast({
        title: status === 'published' ? "Event Published" : "Draft Saved",
        description: `Your event "${formData.title}" has been ${status === 'published' ? 'published' : 'saved as a draft'}.`,
        variant: "default",
      });

      setIsSubmitting(false);
      navigate('/dashboard/organizer/events');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Event</h1>
        <p className="text-muted-foreground mt-2">Set up your new event details</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Essential event details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">Event Title</label>
                  <input
                    id="title"
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="e.g., Tech Conference 2025"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium mb-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Date</span>
                      </div>
                    </label>
                    <input
                      id="date"
                      type="date"
                      className="w-full p-2 border rounded-md"
                      value={formData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium mb-1">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Time</span>
                      </div>
                    </label>
                    <input
                      id="time"
                      type="time"
                      className="w-full p-2 border rounded-md"
                      value={formData.time}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>End Date</span>
                      </div>
                    </label>
                    <input
                      id="endDate"
                      type="date"
                      className="w-full p-2 border rounded-md"
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="endTime" className="block text-sm font-medium mb-1">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>End Time</span>
                      </div>
                    </label>
                    <input
                      id="endTime"
                      type="time"
                      className="w-full p-2 border rounded-md"
                      value={formData.endTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>Location</span>
                    </div>
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="location"
                      type="text"
                      ref={locationInputRef}
                      className="w-full p-2 border rounded-md"
                      placeholder="e.g., Convention Center, 123 Main St"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                    <Button 
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleLocationSelect}
                      className="flex-shrink-0"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {showLocationPicker && (
                    <div className="mt-4 border rounded-md overflow-hidden">
                      <div className="flex justify-between items-center p-2 bg-muted">
                        <h3 className="text-sm font-medium">Select Location on Map</h3>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setShowLocationPicker(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="h-[300px]">
                        <GoogleMap 
                          location={formData.location} 
                          className="w-full h-full"
                          onLocationSelect={handleMapLocationUpdate}
                          interactive={true}
                        />
                      </div>
                      <div className="p-2 text-xs text-muted-foreground">
                        Click to drop a pin or search for a specific location
                      </div>
                    </div>
                  )}
                  
                  {formData.placeId && !showLocationPicker && (
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>Location pin set on map</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
                  <select 
                    id="category" 
                    className="w-full p-2 border rounded-md"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a category</option>
                    <option value="technology">Technology</option>
                    <option value="business">Business</option>
                    <option value="education">Education</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="health">Health</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    id="description"
                    rows={4}
                    className="w-full p-2 border rounded-md"
                    placeholder="Describe your event..."
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                  <div className="mt-1 flex items-center gap-1">
                    <Info className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-muted-foreground">
                      Use our AI assistant to help you write a compelling description.
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Ticket Information</CardTitle>
              <CardDescription>Configure your event tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">General Admission</h3>
                    <Button variant="ghost" size="sm">
                      <Info className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium mb-1">Price ($)</label>
                      <input
                        id="price"
                        type="number"
                        className="w-full p-2 border rounded-md"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium mb-1">Quantity</label>
                      <input
                        id="quantity"
                        type="number"
                        className="w-full p-2 border rounded-md"
                        placeholder="100"
                        value={formData.quantity}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="saleEnds" className="block text-sm font-medium mb-1">Sale Ends</label>
                      <input
                        id="saleEnds"
                        type="date"
                        className="w-full p-2 border rounded-md"
                        value={formData.saleEnds}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Another Ticket Type</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Event Media</CardTitle>
              <CardDescription>Upload event images and media</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <div className="mx-auto flex flex-col items-center">
                    <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                    <h3 className="font-medium mb-1">Drag and drop files</h3>
                    <p className="text-sm text-muted-foreground mb-4">Upload event banner, logo, or photos</p>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" /> Browse Files
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Cover Image Requirements</label>
                  <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Recommended size: 1920x1080 pixels</li>
                    <li>Maximum file size: 5MB</li>
                    <li>Accepted formats: JPG, PNG</li>
                    <li>Aim for high-quality images that represent your event</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
              <CardDescription>Event visibility settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    name="visibility" 
                    value="draft"
                    className="h-4 w-4" 
                    checked={formData.visibility === 'draft'}
                    onChange={handleRadioChange}
                  />
                  <span>
                    <div className="font-medium">Draft</div>
                    <div className="text-xs text-muted-foreground">Save but don't publish yet</div>
                  </span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    name="visibility" 
                    value="published"
                    className="h-4 w-4" 
                    checked={formData.visibility === 'published'}
                    onChange={handleRadioChange}
                  />
                  <span>
                    <div className="font-medium">Publish Now</div>
                    <div className="text-xs text-muted-foreground">Make event visible immediately</div>
                  </span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    name="visibility" 
                    value="scheduled"
                    className="h-4 w-4" 
                    checked={formData.visibility === 'scheduled'}
                    onChange={handleRadioChange}
                  />
                  <span>
                    <div className="font-medium">Schedule</div>
                    <div className="text-xs text-muted-foreground">Set a future publish date</div>
                  </span>
                </label>
                
                <div className="mt-4 pt-4 border-t">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      name="enableRegistration"
                      className="h-4 w-4" 
                      checked={formData.enableRegistration}
                      onChange={handleCheckboxChange}
                    />
                    <span className="text-sm">Enable event registration</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 mt-2">
                    <input 
                      type="checkbox" 
                      name="showOnHomepage"
                      className="h-4 w-4" 
                      checked={formData.showOnHomepage}
                      onChange={handleCheckboxChange}
                    />
                    <span className="text-sm">Show on homepage</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 mt-2">
                    <input 
                      type="checkbox" 
                      name="allowSocialSharing"
                      className="h-4 w-4" 
                      checked={formData.allowSocialSharing}
                      onChange={handleCheckboxChange}
                    />
                    <span className="text-sm">Allow social sharing</span>
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <HelpCircle className="w-4 h-4 mr-2" />
                <span>Preview Settings</span>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Event Settings</CardTitle>
              <CardDescription>Additional configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="capacity" className="block text-sm font-medium mb-1">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>Capacity</span>
                    </div>
                  </label>
                  <input
                    id="capacity"
                    type="number"
                    className="w-full p-2 border rounded-md"
                    placeholder="Max attendees"
                    value={formData.capacity}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="organizer" className="block text-sm font-medium mb-1">Organizer</label>
                  <select 
                    id="organizer" 
                    className="w-full p-2 border rounded-md"
                    value={formData.organizer}
                    onChange={handleInputChange}
                  >
                    <option value="techevents">TechEvents Inc.</option>
                  </select>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <h3 className="font-medium text-sm mb-2">Registration Settings</h3>
                  
                  <label className="flex items-center space-x-2 mt-2">
                    <input 
                      type="checkbox" 
                      name="collectAttendeeDetails"
                      className="h-4 w-4" 
                      checked={formData.collectAttendeeDetails}
                      onChange={handleCheckboxChange}
                    />
                    <span className="text-sm">Collect attendee details</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 mt-2">
                    <input 
                      type="checkbox" 
                      name="sendConfirmationEmails"
                      className="h-4 w-4" 
                      checked={formData.sendConfirmationEmails}
                      onChange={handleCheckboxChange}
                    />
                    <span className="text-sm">Send confirmation emails</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 mt-2">
                    <input 
                      type="checkbox" 
                      name="enableWaitlist"
                      className="h-4 w-4" 
                      checked={formData.enableWaitlist}
                      onChange={handleCheckboxChange}
                    />
                    <span className="text-sm">Enable waitlist</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-end gap-4">
        <Button 
          variant="outline" 
          onClick={handleSaveDraft}
          disabled={isSubmitting}
        >
          <Save className="w-4 h-4 mr-2" />
          <span>Save Draft</span>
        </Button>
        <Button 
          onClick={handlePublish}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Publish Event'}
        </Button>
      </div>
    </div>
  );
};

export default EventCreation;
