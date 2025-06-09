
import { Button } from '@/components/ui/button';
import { ThumbsUp, Heart, Laugh, Angry, Sad } from 'lucide-react';

interface ReactionButtonsProps {
  postId: string;
  isLiked: boolean;
  likesCount: number;
  onToggleLike: (postId: string) => void;
}

const ReactionButtons = ({ postId, isLiked, likesCount, onToggleLike }: ReactionButtonsProps) => {
  const reactions = [
    { type: 'like', icon: ThumbsUp, label: 'Like', color: 'text-blue-500' },
    { type: 'love', icon: Heart, label: 'Love', color: 'text-red-500' },
    { type: 'laugh', icon: Laugh, label: 'Laugh', color: 'text-yellow-500' },
    { type: 'angry', icon: Angry, label: 'Angry', color: 'text-red-600' },
    { type: 'sad', icon: Sad, label: 'Sad', color: 'text-gray-500' }
  ];

  return (
    <div className="flex items-center space-x-1">
      {reactions.map((reaction) => {
        const IconComponent = reaction.icon;
        return (
          <Button
            key={reaction.type}
            variant="ghost"
            size="sm"
            onClick={() => onToggleLike(postId)}
            className={`text-foreground/60 hover:${reaction.color} ${isLiked && reaction.type === 'like' ? reaction.color : ''}`}
          >
            <IconComponent size={16} className={`${isLiked && reaction.type === 'like' ? 'fill-current' : ''}`} />
          </Button>
        );
      })}
      <span className="text-sm text-foreground/60 ml-2">{likesCount}</span>
    </div>
  );
};

export default ReactionButtons;
