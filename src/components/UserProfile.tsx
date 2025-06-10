
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, UserPlus, UserMinus } from 'lucide-react';
import { useFollows } from '@/hooks/useFollows';
import { useConversations } from '@/hooks/useConversations';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface UserProfileProps {
  userId: string;
  fullName: string | null;
  username: string | null;
  bio: string | null;
  avatarUrl: string | null;
  followersCount?: number;
  followingCount?: number;
}

const UserProfile = ({ 
  userId, 
  fullName, 
  username, 
  bio, 
  avatarUrl,
  followersCount = 0,
  followingCount = 0 
}: UserProfileProps) => {
  const { user } = useAuth();
  const { followUser, unfollowUser, isFollowing } = useFollows();
  const { createDirectMessage } = useConversations();
  const navigate = useNavigate();

  const isCurrentUser = user?.id === userId;
  const following = isFollowing(userId);

  const handleFollow = () => {
    if (following) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
  };

  const handleMessage = async () => {
    const conversationId = await createDirectMessage(userId);
    if (conversationId) {
      navigate(`/messages/${conversationId}`);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="glass border-white/20">
      <CardHeader className="text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-2xl font-bold mb-4">
          {avatarUrl ? (
            <img src={avatarUrl} alt={fullName || 'User'} className="w-full h-full rounded-full object-cover" />
          ) : (
            getInitials(fullName)
          )}
        </div>
        <h2 className="text-xl font-bold text-foreground">
          {fullName || 'Anonymous User'}
        </h2>
        {username && (
          <p className="text-foreground/60">@{username}</p>
        )}
        {bio && (
          <p className="text-sm text-foreground/70 mt-2">{bio}</p>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-center space-x-6 mb-4">
          <div className="text-center">
            <div className="text-xl font-bold text-primary">{followersCount}</div>
            <div className="text-sm text-foreground/60">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-primary">{followingCount}</div>
            <div className="text-sm text-foreground/60">Following</div>
          </div>
        </div>

        {!isCurrentUser && (
          <div className="flex space-x-2">
            <Button
              onClick={handleFollow}
              variant={following ? "outline" : "default"}
              className="flex-1"
            >
              {following ? (
                <>
                  <UserMinus size={16} className="mr-2" />
                  Unfollow
                </>
              ) : (
                <>
                  <UserPlus size={16} className="mr-2" />
                  Follow
                </>
              )}
            </Button>
            <Button
              onClick={handleMessage}
              variant="outline"
              className="flex-1"
            >
              <MessageSquare size={16} className="mr-2" />
              Message
            </Button>
          </div>
        )}

        {following && (
          <Badge variant="secondary" className="mt-2 w-full justify-center">
            Following
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default UserProfile;
