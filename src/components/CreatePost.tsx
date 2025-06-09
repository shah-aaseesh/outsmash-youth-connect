
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useState } from 'react';

interface CreatePostProps {
  userInitials: string;
  onCreatePost: (content: string) => void;
}

const CreatePost = ({ userInitials, onCreatePost }: CreatePostProps) => {
  const [newPost, setNewPost] = useState('');

  const handleSubmit = () => {
    if (!newPost.trim()) return;
    onCreatePost(newPost);
    setNewPost('');
  };

  return (
    <Card className="glass border-white/20 mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-semibold">
            {userInitials}
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
        <div className="flex items-center justify-end">
          <Button 
            onClick={handleSubmit}
            disabled={!newPost.trim()}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            Share Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
