
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export const useFollows = () => {
  const [follows, setFollows] = useState<Follow[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    getCurrentUser();
  }, []);

  const fetchFollows = async () => {
    try {
      const { data, error } = await supabase
        .from('follows')
        .select('*');

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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('follows')
        .insert({ 
          follower_id: user.id,
          following_id: followingId 
        });

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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('follower_id', user.id)
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
    if (!currentUserId) return false;
    return follows.some(follow => 
      follow.follower_id === currentUserId && follow.following_id === userId
    );
  };

  const getFollowersCount = (userId: string) => {
    return follows.filter(follow => follow.following_id === userId).length;
  };

  const getFollowingCount = (userId: string) => {
    return follows.filter(follow => follow.follower_id === userId).length;
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
    getFollowersCount,
    getFollowingCount,
    refetch: fetchFollows,
  };
};
