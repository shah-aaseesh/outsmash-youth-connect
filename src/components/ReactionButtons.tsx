
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ThumbsUp, Heart, Smile, Angry, Frown } from 'lucide-react';
import { useState } from 'react';

interface ReactionButtonsProps {
  postId: string;
  isLiked: boolean;
  likesCount: number;
  onToggleLike: (postId: string) => void;
}

const ReactionButtons = ({ postId, isLiked, likesCount, onToggleLike }: ReactionButtonsProps) => {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(isLiked ? 'like' : null);
  
  const reactions = [
    { type: 'like', icon: ThumbsUp, label: 'Like', color: 'text-blue-500', hoverColor: 'hover:text-blue-500' },
    { type: 'love', icon: Heart, label: 'Love', color: 'text-red-500', hoverColor: 'hover:text-red-500' },
    { type: 'laugh', icon: Smile, label: 'Laugh', color: 'text-yellow-500', hoverColor: 'hover:text-yellow-500' },
    { type: 'angry', icon: Angry, label: 'Angry', color: 'text-red-600', hoverColor: 'hover:text-red-600' },
    { type: 'sad', icon: Frown, label: 'Sad', color: 'text-gray-500', hoverColor: 'hover:text-gray-500' }
  ];

  const handleReactionClick = (reactionType: string) => {
    setSelectedReaction(reactionType);
    onToggleLike(postId);
  };

  const currentReaction = reactions.find(r => r.type === selectedReaction);

  return (
    <div className="flex items-center space-x-1">
      <HoverCard openDelay={300} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleReactionClick('like')}
            className={`text-foreground/60 transition-colors ${
              selectedReaction ? currentReaction?.color : 'hover:text-blue-500'
            }`}
          >
            {currentReaction ? (
              <currentReaction.icon size={16} className="fill-current" />
            ) : (
              <ThumbsUp size={16} />
            )}
            <span className="ml-1 text-sm">
              {currentReaction ? currentReaction.label : 'Like'}
            </span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent 
          side="top" 
          className="w-auto p-2 bg-background/95 backdrop-blur-sm border border-white/20"
          sideOffset={8}
        >
          <div className="flex items-center space-x-1">
            {reactions.map((reaction) => {
              const IconComponent = reaction.icon;
              return (
                <Button
                  key={reaction.type}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReactionClick(reaction.type)}
                  className={`p-2 ${reaction.hoverColor} transition-all hover:scale-110 hover:bg-white/10`}
                  title={reaction.label}
                >
                  <IconComponent size={20} />
                </Button>
              );
            })}
          </div>
        </HoverCardContent>
      </HoverCard>
      
      <span className="text-sm text-foreground/60 ml-2">{likesCount}</span>
    </div>
  );
};

export default ReactionButtons;
