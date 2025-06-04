
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, Calendar, ArrowRight } from 'lucide-react';

const CommunityPreview = () => {
  const communityPosts = [
    {
      title: "Just landed my first internship at Google!",
      author: "Sarah Chen",
      group: "Tech Careers",
      replies: 24,
      likes: 89,
      time: "2 hours ago",
      preview: "Wanted to share my journey and tips for landing FAANG internships..."
    },
    {
      title: "Looking for study partners for SAT prep",
      author: "Michael Rodriguez",
      group: "Study Groups",
      replies: 12,
      likes: 31,
      time: "5 hours ago",
      preview: "Starting intensive SAT prep, anyone interested in forming a study group?"
    },
    {
      title: "My experience at Stanford Summer Program",
      author: "Emily Watson",
      group: "Summer Programs",
      replies: 18,
      likes: 67,
      time: "1 day ago",
      preview: "Just finished an amazing 6 weeks at Stanford. Here's everything you need to know..."
    }
  ];

  const upcomingEvents = [
    {
      title: "College Application Workshop",
      date: "Dec 20",
      time: "7:00 PM EST",
      attendees: 156
    },
    {
      title: "Internship Panel Discussion",
      date: "Dec 22",
      time: "6:00 PM EST",
      attendees: 203
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-black/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="gradient-text mb-4">Join Our Thriving Community</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Connect with like-minded students, share experiences, and get support from peers who understand your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Posts */}
          <div className="lg:col-span-2">
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Recent Discussions</h3>
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  <Users size={14} className="mr-1" />
                  2.4k online
                </Badge>
              </div>

              <div className="space-y-4">
                {communityPosts.map((post, index) => (
                  <div key={index} className="glass-hover rounded-lg p-4 transition-all duration-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{post.title}</h4>
                        <div className="flex items-center space-x-3 text-sm text-foreground/60">
                          <span>{post.author}</span>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs border-white/20">
                            {post.group}
                          </Badge>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/70 mb-3">{post.preview}</p>
                    <div className="flex items-center space-x-4 text-sm text-foreground/60">
                      <div className="flex items-center space-x-1">
                        <MessageSquare size={14} />
                        <span>{post.replies} replies</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>❤️</span>
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="ghost" className="text-primary hover:text-primary/80">
                  View All Discussions
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="text-primary" size={20} />
                <h3 className="text-lg font-semibold text-foreground">Upcoming Events</h3>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="glass-hover rounded-lg p-3 transition-all duration-200">
                    <h4 className="font-medium text-foreground mb-1">{event.title}</h4>
                    <div className="text-sm text-foreground/60 mb-2">
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-foreground/50">
                      <Users size={12} />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-4 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Join Community
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Active Members</span>
                  <span className="font-semibold text-primary">10,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Posts This Week</span>
                  <span className="font-semibold text-primary">1,834</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Success Stories</span>
                  <span className="font-semibold text-primary">592</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityPreview;
