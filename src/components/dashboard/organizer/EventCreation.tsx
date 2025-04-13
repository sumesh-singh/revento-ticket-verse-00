
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, User, Upload, Save, PlusCircle, Info, HelpCircle } from 'lucide-react';

const EventCreation = () => {
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
                  <input
                    id="location"
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="e.g., Convention Center, 123 Main St"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
                  <select id="category" className="w-full p-2 border rounded-md">
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
                      />
                    </div>
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium mb-1">Quantity</label>
                      <input
                        id="quantity"
                        type="number"
                        className="w-full p-2 border rounded-md"
                        placeholder="100"
                      />
                    </div>
                    <div>
                      <label htmlFor="saleEnds" className="block text-sm font-medium mb-1">Sale Ends</label>
                      <input
                        id="saleEnds"
                        type="date"
                        className="w-full p-2 border rounded-md"
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
                  <input type="radio" name="visibility" className="h-4 w-4" defaultChecked />
                  <span>
                    <div className="font-medium">Draft</div>
                    <div className="text-xs text-muted-foreground">Save but don't publish yet</div>
                  </span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input type="radio" name="visibility" className="h-4 w-4" />
                  <span>
                    <div className="font-medium">Publish Now</div>
                    <div className="text-xs text-muted-foreground">Make event visible immediately</div>
                  </span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input type="radio" name="visibility" className="h-4 w-4" />
                  <span>
                    <div className="font-medium">Schedule</div>
                    <div className="text-xs text-muted-foreground">Set a future publish date</div>
                  </span>
                </label>
                
                <div className="mt-4 pt-4 border-t">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <span className="text-sm">Enable event registration</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <span className="text-sm">Show on homepage</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" className="h-4 w-4" />
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
                  />
                </div>
                
                <div>
                  <label htmlFor="organizer" className="block text-sm font-medium mb-1">Organizer</label>
                  <select id="organizer" className="w-full p-2 border rounded-md">
                    <option value="techevents">TechEvents Inc.</option>
                  </select>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <h3 className="font-medium text-sm mb-2">Registration Settings</h3>
                  
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" className="h-4 w-4" defaultChecked />
                    <span className="text-sm">Collect attendee details</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" className="h-4 w-4" defaultChecked />
                    <span className="text-sm">Send confirmation emails</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <span className="text-sm">Enable waitlist</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-end gap-4">
        <Button variant="outline">
          <Save className="w-4 h-4 mr-2" />
          <span>Save Draft</span>
        </Button>
        <Button>Publish Event</Button>
      </div>
    </div>
  );
};

export default EventCreation;
