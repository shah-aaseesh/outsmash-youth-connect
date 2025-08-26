import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, MessageSquare, Calendar, TrendingUp, Settings, Plus, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MyCommunities = () => {
  const navigate = useNavigate();

  // Mock data - replace with real data from your backend
  const myCommunities = [
    {
      id: '1',
      name: 'Nepal Tech Students',
      description: 'A community for Nepali students passionate about technology and innovation',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop',
      memberCount: 1247,
      role: 'Admin',
      unreadPosts: 5,
      lastActivity: '2 hours ago',
      category: 'Technology',
      isVerified: true
    },
    {
      id: '2',
      name: 'Study Abroad Aspirants',
      description: 'Connect with students planning to study abroad, share experiences and tips',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop',
      memberCount: 892,
      role: 'Member',
      unreadPosts: 12,
      lastActivity: '4 hours ago',
      category: 'Education',
      isVerified: false
    },
    {
      id: '3',
      name: 'Creative Minds Hub',
      description: 'For designers, artists, writers, and all creative souls to showcase and collaborate',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=200&h=200&fit=crop',
      memberCount: 564,
      role: 'Moderator',
      unreadPosts: 3,
      lastActivity: '1 day ago',
      category: 'Creative',
      isVerified: true
    }
  ];

  const recentPosts = [
    {
      id: '1',
      communityName: 'Nepal Tech Students',
      authorName: 'Ravi Kumar',
      content: 'Just finished my first hackathon! Built an AI-powered study planner app. Would love to get feedback from the community 🚀',
      timestamp: '2 hours ago',
      likes: 23,
      comments: 8,
      tags: ['Hackathon', 'AI', 'Project']
    },
    {
      id: '2',
      communityName: 'Study Abroad Aspirants',
      authorName: 'Sarah Chen',
      content: 'Got accepted to my dream university in Canada! Here\'s what I learned during the application process...',
      timestamp: '4 hours ago',
      likes: 67,
      comments: 15,
      tags: ['Success Story', 'Canada', 'University']
    },
    {
      id: '3',
      communityName: 'Creative Minds Hub',
      authorName: 'Alex Design',
      content: 'Working on a new UI design system. What are your thoughts on these color palettes?',
      timestamp: '6 hours ago',
      likes: 34,
      comments: 12,
      tags: ['Design', 'UI/UX', 'Feedback']
    }
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'Tech Career Panel Discussion',
      community: 'Nepal Tech Students',
      date: '2024-01-20',
      time: '7:00 PM',
      attendees: 45,
      isAttending: true
    },
    {
      id: '2',
      title: 'Study Abroad Workshop',
      community: 'Study Abroad Aspirants',
      date: '2024-01-22',
      time: '2:00 PM',
      attendees: 78,
      isAttending: false
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                My <span className="gradient-text">Communities</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Stay connected with your communities and discover new ones
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => navigate('/community')}
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <Search className="mr-2" size={16} />
                Discover
              </Button>
              <Button 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Plus className="mr-2" size={16} />
                Create Community
              </Button>
            </div>
          </div>

          <Tabs defaultValue="communities" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="communities">My Communities</TabsTrigger>
              <TabsTrigger value="feed">Recent Activity</TabsTrigger>
              <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            </TabsList>

            <TabsContent value="communities">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCommunities.map((community) => (
                  <Card key={community.id} className="community-card cursor-pointer" onClick={() => navigate(`/community/${community.id}`)}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={community.image} />
                          <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">
                            {community.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{community.name}</CardTitle>
                            {community.isVerified && (
                              <Badge variant="secondary" className="text-xs bg-success/10 text-success">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {community.role}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {community.category}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Settings size={16} />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {community.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          {community.memberCount.toLocaleString()} members
                        </div>
                        <span>Active {community.lastActivity}</span>
                      </div>
                      
                      {community.unreadPosts > 0 && (
                        <div className="flex items-center justify-between">
                          <Badge className="bg-accent text-accent-foreground">
                            {community.unreadPosts} new posts
                          </Badge>
                          <Button size="sm" variant="outline">
                            View Updates
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="feed">
              <div className="space-y-6">
                {recentPosts.map((post) => (
                  <Card key={post.id} className="student-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">
                            {post.authorName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{post.authorName}</h4>
                            <span className="text-sm text-muted-foreground">in</span>
                            <Badge variant="secondary" className="text-xs">
                              {post.communityName}
                            </Badge>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                          </div>
                          
                          <p className="text-foreground mb-3">{post.content}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <button className="flex items-center gap-1 hover:text-accent transition-colors">
                              <TrendingUp size={14} />
                              {post.likes} likes
                            </button>
                            <button className="flex items-center gap-1 hover:text-accent transition-colors">
                              <MessageSquare size={14} />
                              {post.comments} comments
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events">
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="student-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-center p-3 bg-primary/10 rounded-lg">
                            <div className="text-sm font-semibold text-primary">
                              {formatDate(event.date)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {event.time}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-lg mb-1">{event.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="secondary" className="text-xs">
                                {event.community}
                              </Badge>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Users size={12} />
                                {event.attendees} attending
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          variant={event.isAttending ? "default" : "outline"}
                          className={event.isAttending ? "bg-success hover:bg-success/90" : "hover:bg-primary hover:text-primary-foreground"}
                        >
                          {event.isAttending ? "Attending" : "Join Event"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MyCommunities;