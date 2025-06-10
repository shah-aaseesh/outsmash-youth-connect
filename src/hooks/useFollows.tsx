
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
  follower?: {
    id: string;
    full_name: string | null;
    username: string | null;
    avatar_url: string | null;
  };
  following?: {
    id: string;
    full_name: string | null;
    username: string | null;
    avatar_url: string | null;
  };
}

export const useFollows = () => {
  const [follows, setFollows] = useState<Follow[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFollows = async () => {
    try {
      const { data, error } = await supabase
        .from('follows')
        .select(`
          *,
          follower:profiles!follows_follower_id_fkey(*),
          following:profiles!follows_following_id_fkey(*)
        `);

      if (error) throw error;
      setFollows(data || []);
    } catch (error) {
      console.error('Error fetching follows:', error);
      toast({
        title: "Error",
        description: "Failed to fetch follows",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const followUser = async (followingId: string) => {
    try {
      const { error } = await supabase
        .from('follows')
        .insert({ following_id: followingId });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "User followed successfully",
      });
      
      fetchFollows();
    } catch (error) {
      console.error('Error following user:', error);
      toast({
        title: "Error",
        description: "Failed to follow user",
        variant: "destructive",
      });
    }
  };

  const unfollowUser = async (followingId: string) => {
    try {
      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('following_id', followingId);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "User unfollowed successfully",
      });
      
      fetchFollows();
    } catch (error) {
      console.error('Error unfollowing user:', error);
      toast({
        title: "Error",
        description: "Failed to unfollow user",
        variant: "destructive",
      });
    }
  };

  const isFollowing = (userId: string) => {
    return follows.some(follow => follow.following_id === userId);
  };

  useEffect(() => {
    fetchFollows();
  }, []);

  return {
    follows,
    loading,
    followUser,
    unfollowUser,
    isFollowing,
    refetch: fetchFollows,
  };
};
