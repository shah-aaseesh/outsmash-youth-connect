
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Award, Calendar, ExternalLink } from 'lucide-react';

const AchievementShowcase = () => {
  const achievements = [
    {
      title: "National Science Fair Winner",
      description: "First place in Environmental Science category for research on sustainable energy solutions",
      type: "Competition",
      date: "March 2024",
      icon: Trophy,
      image: "https://images.unsplash.com/photo-1607100837775-d2ac2e57d44d?w=400",
      verified: true,
      badges: ["STEM", "Research", "Innovation"]
    },
    {
      title: "Youth Climate Ambassador",
      description: "Selected as one of 50 global youth ambassadors for climate action and sustainability initiatives",
      type: "Program",
      date: "June 2024",
      icon: Award,
      image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e0?w=400",
      verified: true,
      badges: ["Leadership", "Global", "Environment"]
    },
    {
      title: "App Development Bootcamp",
      description: "Completed intensive 8-week program building mobile applications with React Native",
      type: "Certification",
      date: "August 2024",
      icon: Star,
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400",
      verified: false,
      badges: ["Technology", "Mobile Development", "React Native"]
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="gradient-text mb-4">Showcase Your Achievements</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Build a compelling portfolio that highlights your accomplishments, skills, and unique experiences.
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div key={index} className="glass glass-hover rounded-xl overflow-hidden animate-fade-in group">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-black/50 text-white border-white/20">
                      {achievement.type}
                    </Badge>
                  </div>

                  {/* Verified Badge */}
                  {achievement.verified && (
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Star className="text-white" size={16} fill="currentColor" />
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 glass rounded-lg flex items-center justify-center">
                      <IconComponent className="text-primary" size={20} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{achievement.title}</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">{achievement.description}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {achievement.badges.map((badge, badgeIndex) => (
                      <Badge key={badgeIndex} variant="outline" className="text-xs border-white/20 text-foreground/70">
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-1 text-sm text-foreground/60">
                      <Calendar size={14} />
                      <span>{achievement.date}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 group">
                      View Details
                      <ExternalLink className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="glass rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Start Building Your Portfolio</h3>
            <p className="text-foreground/70 mb-6">
              Join thousands of students who are already showcasing their achievements and discovering new opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Create Your Profile
              </Button>
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                View Examples
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementShowcase;
