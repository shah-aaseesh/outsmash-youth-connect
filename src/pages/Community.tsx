
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MessageSquare, Users, Calendar, Plus, Search, Filter, Heart, Share, MoreHorizontal, Image, Video, FileText, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '@/hooks/usePosts';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const { toast } = useToast();
  const { user, loading: authLoading, signOut } = useAuth();
  const { posts, loading: postsLoading, createPost, toggleLike, toggleRepost } = usePosts();
  const [newPost, setNewPost] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const discussionCategories = [
    { name: "Tech Careers", count: 1247, color: "bg-blue-500/20 text-blue-400" },
    { name: "Study Groups", count: 892, color: "bg-green-500/20 text-green-400" },
    { name: "Summer Programs", count: 634, color: "bg-purple-500/20 text-purple-400" },
    { name: "College Apps", count: 1456, color: "bg-orange-500/20 text-orange-400" },
    { name: "Internships", count: 987, color: "bg-pink-500/20 text-pink-400" },
    { name: "General", count: 2341, color: "bg-gray-500/20 text-gray-400" }
  ];

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;
    await createPost(newPost);
    setNewPost('');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-background to-background/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="gradient-text">Student Community</h1>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="border-white/20"
              >
                <LogOut className="mr-2" size={16} />
                Sign Out
              </Button>
            </div>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
              Share your journey, connect with peers, and discover opportunities together.
            </p>
            
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40" size={20} />
                <Input 
                  placeholder="Search posts, topics, or users..." 
                  className="pl-10 glass border-white/20"
                />
              </div>
              <Button variant="outline" className="border-white/20">
                <Filter className="mr-2" size={16} />
                Filter
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
              <div className="text-2xl font-bold text-primary mb-1">{posts.length}</div>
              <div className="text-sm text-foreground/60">Total Posts</div>
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
                <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
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

            {/* Main Feed */}
            <div className="lg:col-span-3">
              
              {/* Create Post */}
              <Card className="glass border-white/20 mb-6">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-semibold">
                      {getInitials(user.user_metadata?.full_name)}
                    </div>
                    <div className="flex-1">
                      <Textarea
                        placeholder="What's on your mind? Share your thoughts, questions, or achievements..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="min-h-[100px] resize-none border-none bg-transparent placeholder:text-foreground/50 focus-visible:ring-0"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-foreground/60">
                      <Button variant="ghost" size="sm" className="text-foreground/60 hover:text-primary">
                        <Image size={16} className="mr-2" />
                        Photo
                      </Button>
                      <Button variant="ghost" size="sm" className="text-foreground/60 hover:text-primary">
                        <Video size={16} className="mr-2" />
                        Video
                      </Button>
                      <Button variant="ghost" size="sm" className="text-foreground/60 hover:text-primary">
                        <FileText size={16} className="mr-2" />
                        Document
                      </Button>
                    </div>
                    <Button 
                      onClick={handleCreatePost}
                      disabled={!newPost.trim()}
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    >
                      Share Post
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Posts Feed */}
              {postsLoading ? (
                <div className="text-center py-8">Loading posts...</div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => {
                    const isLiked = post.post_likes.some(like => like.user_id === user.id);
                    const isReposted = post.reposts.some(repost => repost.user_id === user.id);
                    
                    return (
                      <Card key={post.id} className="glass border-white/20">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-semibold">
                                {getInitials(post.profiles?.full_name)}
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground">
                                  {post.profiles?.full_name || 'Anonymous'}
                                </h4>
                                <p className="text-sm text-foreground/60">{formatTimeAgo(post.created_at)}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal size={16} />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-foreground/80 mb-4 leading-relaxed">{post.content}</p>

                          {/* Post Actions */}
                          <div className="flex items-center justify-between pt-3 border-t border-white/10">
                            <div className="flex items-center space-x-6">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => toggleLike(post.id)}
                                className={`text-foreground/60 hover:text-red-400 ${isLiked ? 'text-red-400' : ''}`}
                              >
                                <Heart size={16} className={`mr-2 ${isLiked ? 'fill-current' : ''}`} />
                                {post.post_likes.length}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-foreground/60 hover:text-primary">
                                <MessageSquare size={16} className="mr-2" />
                                {post.comments.length}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => toggleRepost(post.id)}
                                className={`text-foreground/60 hover:text-green-400 ${isReposted ? 'text-green-400' : ''}`}
                              >
                                <Share size={16} className="mr-2" />
                                {post.reposts.length}
                              </Button>
                            </div>
                            <Badge variant="outline" className="text-xs border-white/20 capitalize">
                              {post.post_type}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}

              {/* Load More */}
              <div className="text-center mt-8">
                <Button variant="outline" className="border-white/20 hover:bg-white/5">
                  Load More Posts
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
