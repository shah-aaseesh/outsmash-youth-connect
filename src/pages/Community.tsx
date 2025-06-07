
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CommunityPreview from '@/components/CommunityPreview';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, Calendar, Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Community = () => {
  const discussionCategories = [
    { name: "Tech Careers", count: 1247, color: "bg-blue-500/20 text-blue-400" },
    { name: "Study Groups", count: 892, color: "bg-green-500/20 text-green-400" },
    { name: "Summer Programs", count: 634, color: "bg-purple-500/20 text-purple-400" },
    { name: "College Apps", count: 1456, color: "bg-orange-500/20 text-orange-400" },
    { name: "Internships", count: 987, color: "bg-pink-500/20 text-pink-400" },
    { name: "General", count: 2341, color: "bg-gray-500/20 text-gray-400" }
  ];

  const featuredDiscussions = [
    {
      title: "Comprehensive Guide to FAANG Internship Applications",
      author: "Alex Thompson",
      group: "Tech Careers",
      replies: 156,
      likes: 342,
      time: "3 hours ago",
      preview: "After landing internships at Google, Microsoft, and Apple, here's my complete guide covering everything from resume tips to interview preparation...",
      isPinned: true
    },
    {
      title: "Stanford REU Program - Application Tips & Experience",
      author: "Maria Gonzalez",
      group: "Summer Programs",
      replies: 89,
      likes: 201,
      time: "6 hours ago",
      preview: "Just finished an amazing summer at Stanford's REU program. Here's everything you need to know about applying and what to expect...",
      isPinned: false
    },
    {
      title: "Study Group for SAT/ACT Prep - Winter 2024",
      author: "David Kim",
      group: "Study Groups",
      replies: 34,
      likes: 78,
      time: "1 day ago",
      preview: "Looking to form a dedicated study group for standardized test prep. Planning to meet 3x/week virtually...",
      isPinned: false
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-background to-background/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="gradient-text mb-4">Student Community</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
              Connect with peers, share experiences, and get support from students who understand your journey.
            </p>
            
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40" size={20} />
                <Input 
                  placeholder="Search discussions, topics, or users..." 
                  className="pl-10 glass border-white/20"
                />
              </div>
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Plus className="mr-2" size={16} />
                New Discussion
              </Button>
            </div>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">10,247</div>
              <div className="text-sm text-foreground/60">Active Members</div>
            </div>
            <div className="glass rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">1,834</div>
              <div className="text-sm text-foreground/60">This Week's Posts</div>
            </div>
            <div className="glass rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">592</div>
              <div className="text-sm text-foreground/60">Success Stories</div>
            </div>
            <div className="glass rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">2.4k</div>
              <div className="text-sm text-foreground/60">Online Now</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="glass rounded-xl p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-foreground mb-4">Discussion Categories</h3>
                <div className="space-y-3">
                  {discussionCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 glass-hover rounded-lg cursor-pointer transition-all duration-200">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${category.color.split(' ')[0]}`}></div>
                        <span className="text-foreground font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="bg-white/10 text-foreground/60">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Discussion Feed */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">Recent Discussions</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Filter className="mr-2" size={16} />
                    Filter
                  </Button>
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    <Users size={14} className="mr-1" />
                    2.4k online
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                {featuredDiscussions.map((discussion, index) => (
                  <div key={index} className="glass rounded-xl p-6 hover:glass-hover transition-all duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {discussion.isPinned && (
                            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                              📌 Pinned
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs border-white/20">
                            {discussion.group}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary cursor-pointer transition-colors">
                          {discussion.title}
                        </h3>
                        <div className="flex items-center space-x-3 text-sm text-foreground/60 mb-3">
                          <span>{discussion.author}</span>
                          <span>•</span>
                          <span>{discussion.time}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-foreground/70 mb-4">{discussion.preview}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-foreground/60">
                        <div className="flex items-center space-x-1 hover:text-primary cursor-pointer transition-colors">
                          <MessageSquare size={16} />
                          <span>{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center space-x-1 hover:text-primary cursor-pointer transition-colors">
                          <span>❤️</span>
                          <span>{discussion.likes}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        Join Discussion →
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <Button variant="outline" className="border-white/20 hover:bg-white/5">
                  Load More Discussions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Community;
