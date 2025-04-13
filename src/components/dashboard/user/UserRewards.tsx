
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Gift, CreditCard, Clock, ArrowRight } from 'lucide-react';

const UserRewards = () => {
  const rewardTiers = [
    { name: "Bronze", points: 0, color: "bg-amber-700", textColor: "text-amber-700", current: false },
    { name: "Silver", points: 500, color: "bg-slate-400", textColor: "text-slate-400", current: true },
    { name: "Gold", points: 1000, color: "bg-yellow-500", textColor: "text-yellow-500", current: false },
    { name: "Platinum", points: 2500, color: "bg-slate-200", textColor: "text-slate-500", current: false },
    { name: "Diamond", points: 5000, color: "bg-blue-300", textColor: "text-blue-300", current: false }
  ];
  
  const currentPoints = 750;
  const nextTier = rewardTiers.find(tier => tier.points > currentPoints);
  const pointsToNextTier = nextTier ? nextTier.points - currentPoints : 0;
  const progressPercentage = nextTier ? (currentPoints - 500) / (nextTier.points - 500) * 100 : 100;
  
  const rewardHistory = [
    { date: "Apr 5, 2025", event: "Tech Conference 2025", action: "Attended Event", points: "+150" },
    { date: "Mar 22, 2025", event: "Feedback Survey", action: "Submitted", points: "+25" },
    { date: "Mar 15, 2025", event: "Hackathon", action: "Attended Event", points: "+200" },
    { date: "Mar 1, 2025", event: "Early Bird Discount", action: "Redeemed", points: "-100" },
    { date: "Feb 20, 2025", event: "Workshop", action: "Attended Event", points: "+75" }
  ];
  
  const availableRewards = [
    { name: "15% Off Next Ticket", points: 250, image: "/placeholder.svg" },
    { name: "VIP Access Upgrade", points: 500, image: "/placeholder.svg" },
    { name: "Exclusive Merch Item", points: 750, image: "/placeholder.svg" },
    { name: "Front Row Seating", points: 1000, image: "/placeholder.svg" }
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Rewards Hub</h1>
        <p className="text-muted-foreground mt-2">Earn and redeem rewards for participating in events</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Rewards Status</CardTitle>
            <CardDescription>Current Tier: Silver</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                <span>{currentPoints} Points</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {pointsToNextTier} points to {nextTier?.name}
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            {/* Reward tiers */}
            <div className="flex justify-between mt-2">
              {rewardTiers.map((tier, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${tier.current ? 'ring-2 ring-offset-2 ring-blue-500' : ''} ${tier.color}`}></div>
                  <span className={`text-xs font-medium mt-1 ${tier.current ? tier.textColor : 'text-gray-500'}`}>{tier.name}</span>
                  <span className="text-xs text-gray-500">{tier.points}</span>
                </div>
              ))}
            </div>
            
            {/* Tier benefits */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-medium mb-2">Silver Tier Benefits</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div>
                  <span>Early access to select events</span>
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div>
                  <span>10% discount on merchandise</span>
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div>
                  <span>Special birthday rewards</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Point Balance</CardTitle>
            <CardDescription>Current and historical points</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="text-blue-500 mb-1 flex items-center">
                  <CreditCard className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Current</span>
                </div>
                <div className="text-2xl font-bold">{currentPoints}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="text-purple-500 mb-1 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Lifetime</span>
                </div>
                <div className="text-2xl font-bold">1,250</div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" className="justify-start">
                  <Gift className="w-4 h-4 mr-2" />
                  <span>Redeem Points</span>
                </Button>
                <Button variant="outline" className="justify-start">
                  <Star className="w-4 h-4 mr-2" />
                  <span>View All Rewards</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Reward History</CardTitle>
            <CardDescription>Recent point activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rewardHistory.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-sm transition-all duration-300">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{item.event}</h3>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-muted-foreground">{item.action}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <span className={`font-medium ${item.points.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {item.points}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Activity</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Available Rewards</CardTitle>
            <CardDescription>Redeem your points for these offers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableRewards.map((reward, index) => (
                <div 
                  key={index} 
                  className="relative group overflow-hidden rounded-lg border hover:shadow-md transition-all duration-300"
                >
                  <img 
                    src={reward.image} 
                    alt={reward.name} 
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-medium text-sm">{reward.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-semibold text-muted-foreground">{reward.points} points</span>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Browse All Rewards</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UserRewards;
