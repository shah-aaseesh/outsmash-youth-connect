
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Post {
  id: string;
  content: string;
  user_id: string;
  post_type: 'post' | 'question' | 'announcement';
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  profiles: {
    full_name: string | null;
    username: string | null;
  } | null;
  post_likes: { user_id: string }[];
  comments: { id: string }[];
  reposts: { user_id: string }[];
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles!posts_user_id_fkey (full_name, username),
          post_likes (user_id),
          comments (id),
          reposts (user_id)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Type casting to ensure post_type is correctly typed
      const typedPosts = (data || []).map(post => ({
        ...post,
        post_type: post.post_type as 'post' | 'question' | 'announcement'
      })) as Post[];
      
      setPosts(typedPosts);
    } catch (error: any) {
      toast({
        title: "Error loading posts",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content: string, postType: string = 'post') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('posts')
        .insert({
          content,
          user_id: user.id,
          post_type: postType,
        });

      if (error) throw error;
      
      await fetchPosts();
      toast({
        title: "Post created!",
        description: "Your post has been shared with the community.",
      });
    } catch (error: any) {
      toast({
        title: "Error creating post",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleLike = async (postId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const post = posts.find(p => p.id === postId);
      const isLiked = post?.post_likes.some(like => like.user_id === user.id);

      if (isLiked) {
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('post_likes')
          .insert({ post_id: postId, user_id: user.id });
      }

      await fetchPosts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleRepost = async (postId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const post = posts.find(p => p.id === postId);
      const isReposted = post?.reposts.some(repost => repost.user_id === user.id);

      if (isReposted) {
        await supabase
          .from('reposts')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('reposts')
          .insert({ post_id: postId, user_id: user.id });
      }

      await fetchPosts();
      toast({
        title: "Post shared!",
        description: "You've reposted this to your timeline.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    createPost,
    toggleLike,
    toggleRepost,
    refetch: fetchPosts,
  };
};
