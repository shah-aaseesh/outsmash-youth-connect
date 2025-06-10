
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import UserProfile from '@/components/UserProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, MessageSquare, Edit } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useFollows } from '@/hooks/useFollows';
import { usePosts } from '@/hooks/usePosts';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import PostCard from '@/components/PostCard';

const Profile = () => {
  const { userId } = useParams();
  const { user, loading: authLoading } = useAuth();
  const { follows } = useFollows();
  const { posts } = usePosts();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    full_name: '',
    username: '',
    bio: '',
  });

  const targetUserId = userId || user?.id;
  const isCurrentUser = user?.id === targetUserId;

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!targetUserId) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', targetUserId)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching profile:', error);
          return;
        }

        setProfileData(data);
        if (data) {
          setEditData({
            full_name: data.full_name || '',
            username: data.username || '',
            bio: data.bio || '',
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [targetUserId]);

  const updateProfile = async () => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...editData,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setProfileData({ ...profileData, ...editData });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const userPosts = posts.filter(post => post.user_id === targetUserId);
  const followerCount = follows.filter(follow => follow.following_id === targetUserId).length;
  const followingCount = follows.filter(follow => follow.follower_id === targetUserId).length;

  if (authLoading || loading) {
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
      
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="md:col-span-1">
              <UserProfile
                userId={targetUserId!}
                fullName={profileData?.full_name}
                username={profileData?.username}
                bio={profileData?.bio}
                avatarUrl={profileData?.avatar_url}
                followersCount={followerCount}
                followingCount={followingCount}
              />

              {isCurrentUser && (
                <Card className="glass border-white/20 mt-4">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Edit size={20} />
                      <span>Edit Profile</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-4">
                        <Input
                          placeholder="Full Name"
                          value={editData.full_name}
                          onChange={(e) => setEditData({...editData, full_name: e.target.value})}
                        />
                        <Input
                          placeholder="Username"
                          value={editData.username}
                          onChange={(e) => setEditData({...editData, username: e.target.value})}
                        />
                        <Textarea
                          placeholder="Bio"
                          value={editData.bio}
                          onChange={(e) => setEditData({...editData, bio: e.target.value})}
                        />
                        <div className="flex space-x-2">
                          <Button onClick={updateProfile} className="flex-1">
                            Save
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setIsEditing(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button onClick={() => setIsEditing(true)} className="w-full">
                        Edit Profile
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Posts Feed */}
            <div className="md:col-span-2">
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle>
                    {isCurrentUser ? 'Your Posts' : `${profileData?.full_name || 'User'}'s Posts`} 
                    ({userPosts.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userPosts.length === 0 ? (
                    <div className="text-center py-8 text-foreground/60">
                      {isCurrentUser ? 'You haven\'t posted anything yet' : 'No posts yet'}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userPosts.map((post) => (
                        <PostCard
                          key={post.id}
                          post={post}
                          currentUserId={user.id}
                          userInitials={user.user_metadata?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                          onToggleLike={() => {}}
                          onToggleRepost={() => {}}
                          onCommentSubmit={() => {}}
                          formatTimeAgo={(dateString: string) => {
                            const date = new Date(dateString);
                            const now = new Date();
                            const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
                            
                            if (diffInHours < 1) return 'now';
                            if (diffInHours < 24) return `${diffInHours} hours ago`;
                            return `${Math.floor(diffInHours / 24)} days ago`;
                          }}
                          getInitials={(name: string | null) => {
                            if (!name) return 'U';
                            return name.split(' ').map(n => n[0]).join('').toUpperCase();
                          }}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
