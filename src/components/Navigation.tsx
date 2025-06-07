
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">OS</span>
            </div>
            <span className="font-bold text-xl gradient-text">OutSmash</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-foreground/80 hover:text-primary transition-colors ${
                isActive('/') ? 'text-primary' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/opportunities" 
              className={`text-foreground/80 hover:text-primary transition-colors ${
                isActive('/opportunities') ? 'text-primary' : ''
              }`}
            >
              Opportunities
            </Link>
            <Link 
              to="/community" 
              className={`text-foreground/80 hover:text-primary transition-colors ${
                isActive('/community') ? 'text-primary' : ''
              }`}
            >
              Community
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user.user_metadata?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                  </span>
                </div>
              </div>
            ) : (
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  <User className="mr-2" size={16} />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 glass rounded-lg mt-2">
              <Link
                to="/"
                className={`block px-3 py-2 text-foreground/80 hover:text-primary transition-colors ${
                  isActive('/') ? 'text-primary' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/opportunities"
                className={`block px-3 py-2 text-foreground/80 hover:text-primary transition-colors ${
                  isActive('/opportunities') ? 'text-primary' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                Opportunities
              </Link>
              <Link
                to="/community"
                className={`block px-3 py-2 text-foreground/80 hover:text-primary transition-colors ${
                  isActive('/community') ? 'text-primary' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                Community
              </Link>
              
              {!user && (
                <Link
                  to="/auth"
                  className="block px-3 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    <User className="mr-2" size={16} />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
