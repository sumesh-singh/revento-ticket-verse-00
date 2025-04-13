
import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon, User, Bell, Ticket, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(250);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Demo: check if user is logged in
    // In a real app, this would use auth context or redux
    const checkLoginStatus = () => {
      const hasToken = localStorage.getItem('auth_token');
      setIsLoggedIn(!!hasToken);
    };
    
    checkLoginStatus();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsLoggedIn(false);
    
    // Add a toast notification
    // In a real app, this would trigger auth context logout
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <span className="font-display font-bold text-xl bg-clip-text text-transparent bg-gradient-primary">
            Revento
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/events" className="font-medium hover:text-primary transition-colors">Events</Link>
          <Link to="/rewards" className="font-medium hover:text-primary transition-colors">Rewards</Link>
          {isLoggedIn ? (
            <>
              <Link to="/tickets" className="font-medium hover:text-primary transition-colors relative">
                My Tickets
                <Badge variant="secondary" className="absolute -top-1 -right-3 min-w-[1.5rem] h-[1.5rem] flex items-center justify-center">3</Badge>
              </Link>
              <Link 
                to="/dashboard" 
                className="font-medium hover:text-primary transition-colors flex items-center gap-2"
              >
                <span>Dashboard</span>
                <Badge variant="secondary" className="flex items-center gap-1 px-2">
                  <span className="text-yellow-500">★</span> {rewardPoints}
                </Badge>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 p-0 hover:bg-primary/10">
                    <Avatar className="h-9 w-9 border-2 border-primary/20">
                      <AvatarImage src="https://source.unsplash.com/random/100x100/?student" alt="User" />
                      <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">User Name</p>
                      <p className="text-xs text-muted-foreground">user@example.com</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/user/profile" className="cursor-pointer">
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/user/tickets" className="cursor-pointer">
                      My Tickets
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/user/rewards" className="cursor-pointer">
                      Rewards Center
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/map" className="font-medium hover:text-primary transition-colors">Map</Link>
              <Link to="/support" className="font-medium hover:text-primary transition-colors">Support</Link>
              <Link to="/auth" className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg px-4 py-2 transition-all duration-300 group">
                <User size={18} />
                <span>Login</span>
                <span className="w-0 overflow-hidden group-hover:w-auto transition-all duration-300 group-hover:ml-1">/ Signup</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? (
            <XIcon className="h-6 w-6 text-gray-800" />
          ) : (
            <MenuIcon className="h-6 w-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white w-full shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-[400px] py-4' : 'max-h-0 overflow-hidden'
      }`}>
        <div className="container mx-auto px-4 flex flex-col gap-4">
          <Link to="/events" className="font-medium py-2 hover:text-primary transition-colors">Events</Link>
          <Link to="/rewards" className="font-medium py-2 hover:text-primary transition-colors">Rewards</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/tickets" className="font-medium py-2 hover:text-primary transition-colors flex justify-between items-center">
                My Tickets
                <Badge variant="secondary">3</Badge>
              </Link>
              <Link to="/dashboard" className="font-medium py-2 hover:text-primary transition-colors flex justify-between items-center">
                Dashboard
                <Badge variant="secondary" className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span> {rewardPoints}
                </Badge>
              </Link>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://source.unsplash.com/random/100x100/?student" alt="User" />
                    <AvatarFallback>US</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">User Name</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500">
                  <LogOut size={16} />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/map" className="font-medium py-2 hover:text-primary transition-colors">Map</Link>
              <Link to="/support" className="font-medium py-2 hover:text-primary transition-colors">Support</Link>
              <Link to="/auth" className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg px-4 py-2 transition-all duration-300">
                <User size={18} />
                <span>Login / Signup</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
