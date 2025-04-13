
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart2, PieChart, TrendingUp, Download, Calendar, Filter, RefreshCw } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const OrganizerAnalytics = () => {
  const salesData = [
    { date: "Jan", sales: 38, attendance: 30 },
    { date: "Feb", sales: 52, attendance: 45 },
    { date: "Mar", sales: 61, attendance: 55 },
    { date: "Apr", sales: 145, attendance: 0 },
    { date: "May", sales: 48, attendance: 0 },
    { date: "Jun", sales: 38, attendance: 0 },
    { date: "Jul", sales: 65, attendance: 0 }
  ];
  
  const categoryData = [
    { name: 'Tech Conference', value: 248 },
    { name: 'Hackathon', value: 156 },
    { name: 'AI Summit', value: 89 },
    { name: 'Startup Meetup', value: 42 }
  ];
  
  const demographicData = [
    { name: "18-24", value: 25 },
    { name: "25-34", value: 45 },
    { name: "35-44", value: 20 },
    { name: "45+", value: 10 }
  ];
  
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-2">Track your event performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button variant="outline" size="sm" className="gap-1">
          <Calendar className="h-4 w-4" />
          <span>Last 30 Days</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Filter className="h-4 w-4" />
          <span>All Events</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Total Tickets</CardTitle>
              <CardDescription>Tickets sold this period</CardDescription>
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">535</div>
            <p className="text-sm text-green-500 mt-1">+12.5% from last period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Revenue</CardTitle>
              <CardDescription>Total earnings this period</CardDescription>
            </div>
            <BarChart2 className="w-5 h-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$24,856</div>
            <p className="text-sm text-green-500 mt-1">+8.2% from last period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Attendance Rate</CardTitle>
              <CardDescription>Check-in percentage</CardDescription>
            </div>
            <PieChart className="w-5 h-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87.4%</div>
            <p className="text-sm text-amber-500 mt-1">+2.1% from last period</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Ticket sales and attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" name="Tickets Sold" fill="#8884d8" />
                  <Bar dataKey="attendance" name="Attendance" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Ticket Sales Trend</CardTitle>
            <CardDescription>Daily sales overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="sales" name="Tickets Sold" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Distribution</CardTitle>
            <CardDescription>Tickets sold by event</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Attendee Demographics</CardTitle>
            <CardDescription>Age distribution of attendees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={demographicData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {demographicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Event Performance Breakdown</CardTitle>
          <CardDescription>Detailed view of all events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Event Name</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Tickets Sold</th>
                  <th className="px-4 py-3">Revenue</th>
                  <th className="px-4 py-3">Attendance</th>
                  <th className="px-4 py-3">Conversion Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="px-4 py-4 font-medium">Tech Conference 2025</td>
                  <td className="px-4 py-4">April 15, 2025</td>
                  <td className="px-4 py-4">248</td>
                  <td className="px-4 py-4">$12,400</td>
                  <td className="px-4 py-4">214 (86%)</td>
                  <td className="px-4 py-4">13.4%</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-4 py-4 font-medium">Developer Hackathon</td>
                  <td className="px-4 py-4">May 12, 2025</td>
                  <td className="px-4 py-4">156</td>
                  <td className="px-4 py-4">$7,800</td>
                  <td className="px-4 py-4">142 (91%)</td>
                  <td className="px-4 py-4">9.8%</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-4 py-4 font-medium">AI Summit</td>
                  <td className="px-4 py-4">June 20, 2025</td>
                  <td className="px-4 py-4">89</td>
                  <td className="px-4 py-4">$3,560</td>
                  <td className="px-4 py-4">78 (88%)</td>
                  <td className="px-4 py-4">6.2%</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-4 font-medium">Startup Networking</td>
                  <td className="px-4 py-4">July 5, 2025</td>
                  <td className="px-4 py-4">42</td>
                  <td className="px-4 py-4">$1,096</td>
                  <td className="px-4 py-4">35 (83%)</td>
                  <td className="px-4 py-4">4.7%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View Full Reports</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrganizerAnalytics;
