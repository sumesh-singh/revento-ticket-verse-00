
import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon, User, Bell, Ticket, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  // Generate initials from name
  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <span className="font-display font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Revento
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/events" className="font-medium hover:text-primary transition-colors">Events</Link>
          <Link to="/rewards" className="font-medium hover:text-primary transition-colors">Rewards</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" 
                className="font-medium hover:text-primary transition-colors flex items-center gap-2"
              >
                <span>Dashboard</span>
                {user?.rewardPoints && (
                  <Badge variant="secondary" className="flex items-center gap-1 px-2">
                    <span className="text-yellow-500">★</span> {user.rewardPoints}
                  </Badge>
                )}
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 p-0 hover:bg-primary/10">
                    <Avatar className="h-9 w-9 border-2 border-primary/20">
                      <AvatarImage src={user?.avatarUrl || "https://source.unsplash.com/random/100x100/?student"} alt="User" />
                      <AvatarFallback>{user ? getInitials(user.name) : 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name || 'User'}</p>
                      <p className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={user?.role === 'user' ? "/dashboard/user/profile" : "/dashboard/organizer/profile"} className="cursor-pointer">
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === 'user' && (
                    <>
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
                    </>
                  )}
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
              <Link to="/rewards" className="font-medium hover:text-primary transition-colors">How It Works</Link>
              <Link to="/auth" className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg px-4 py-2 transition-colors">
                <User size={18} />
                <span>Login</span>
                <span className="hidden group-hover:inline ml-1">/&nbsp;Signup</span>
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
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="font-medium py-2 hover:text-primary transition-colors flex justify-between items-center">
                Dashboard
                {user?.rewardPoints && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span> {user.rewardPoints}
                  </Badge>
                )}
              </Link>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatarUrl || "https://source.unsplash.com/random/100x100/?student"} alt="User" />
                    <AvatarFallback>{user ? getInitials(user.name) : 'U'}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user?.name || 'User'}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500">
                  <LogOut size={16} />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/rewards" className="font-medium py-2 hover:text-primary transition-colors">How It Works</Link>
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
