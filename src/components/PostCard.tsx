import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageSquare, Share, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import ReactionButtons from './ReactionButtons';
import { Post } from '@/hooks/usePosts';

interface PostCardProps {
  post: Post;
  currentUserId: string;
  userInitials: string;
  onToggleLike: (postId: string) => void;
  onToggleRepost: (postId: string) => void;
  onCommentSubmit: (postId: string, comment: string) => void;
  formatTimeAgo: (dateString: string) => string;
  getInitials: (name: string | null) => string;
}

const PostCard = ({ 
  post, 
  currentUserId, 
  userInitials, 
  onToggleLike, 
  onToggleRepost, 
  onCommentSubmit,
  formatTimeAgo,
  getInitials
}: PostCardProps) => {
  const [commentInput, setCommentInput] = useState('');
  const [showComments, setShowComments] = useState(false);

  const isLiked = post.post_likes.some(like => like.user_id === currentUserId);
  const isReposted = post.reposts.some(repost => repost.user_id === currentUserId);

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;
    onCommentSubmit(post.id, commentInput);
    setCommentInput('');
  };

  const toggleCommentsSection = () => {
    setShowComments(!showComments);
  };

  return (
    <Card className="glass border-white/20">
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
            <ReactionButtons
              postId={post.id}
              isLiked={isLiked}
              likesCount={post.post_likes.length}
              onToggleLike={onToggleLike}
            />
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleCommentsSection}
              className="text-foreground/60 hover:text-primary"
            >
              <MessageSquare size={16} className="mr-2" />
              {post.comments.length}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onToggleRepost(post.id)}
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

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-sm font-semibold">
                {userInitials}
              </div>
              <div className="flex-1 flex space-x-2">
                <Input
                  placeholder="Write a comment..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="glass border-white/20"
                />
                <Button
                  onClick={handleCommentSubmit}
                  disabled={!commentInput.trim()}
                  size="sm"
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  Post
                </Button>
              </div>
            </div>
            
            {/* Existing comments would go here */}
            <div className="text-sm text-foreground/60">
              Comments will appear here once the backend is implemented
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
