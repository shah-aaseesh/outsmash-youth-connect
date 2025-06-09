
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { LogOut, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '@/hooks/usePosts';
import { useNavigate } from 'react-router-dom';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';

const Community = () => {
  const { toast } = useToast();
  const { user, loading: authLoading, signOut } = useAuth();
  const { posts, loading: postsLoading, createPost, toggleLike, toggleRepost } = usePosts();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleCreatePost = async (content: string) => {
    await createPost(content);
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

  const handleCommentSubmit = (postId: string, comment: string) => {
    // TODO: Implement comment creation
    toast({
      title: "Comment added!",
      description: "Your comment has been posted.",
    });
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

  const userInitials = getInitials(user.user_metadata?.full_name);

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
        <div className="max-w-4xl mx-auto">
          
          {/* Create Post */}
          <CreatePost 
            userInitials={userInitials}
            onCreatePost={handleCreatePost}
          />

          {/* Posts Feed */}
          {postsLoading ? (
            <div className="text-center py-8">Loading posts...</div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUserId={user.id}
                  userInitials={userInitials}
                  onToggleLike={toggleLike}
                  onToggleRepost={toggleRepost}
                  onCommentSubmit={handleCommentSubmit}
                  formatTimeAgo={formatTimeAgo}
                  getInitials={getInitials}
                />
              ))}
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" className="border-white/20 hover:bg-white/5">
              Load More Posts
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Community;
