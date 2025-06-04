
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Users, Trophy } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-7xl mx-auto text-center">
        {/* Hero Badge */}
        <div className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in">
          <Star className="text-primary" size={16} />
          <span className="text-sm text-foreground/80">Join 10,000+ ambitious students</span>
        </div>

        {/* Main Headline */}
        <h1 className="gradient-text mb-6 animate-fade-in max-w-4xl mx-auto leading-tight">
          Showcase Your Potential,
          <br />
          Discover Your Future
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto animate-fade-in leading-relaxed">
          The modern platform where high school and gap year students showcase achievements, 
          discover tailored opportunities, and build meaningful connections.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 glow-effect group px-8 py-4 text-lg"
          >
            Get Started Free
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300 px-8 py-4 text-lg"
          >
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-slide-in">
          <div className="glass glass-hover rounded-xl p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Users className="text-primary" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">10K+</h3>
            <p className="text-foreground/60">Active Students</p>
          </div>

          <div className="glass glass-hover rounded-xl p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <Trophy className="text-accent" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">500+</h3>
            <p className="text-foreground/60">Opportunities</p>
          </div>

          <div className="glass glass-hover rounded-xl p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Star className="text-primary" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">95%</h3>
            <p className="text-foreground/60">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
