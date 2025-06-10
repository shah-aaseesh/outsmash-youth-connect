
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Conversation {
  id: string;
  name: string | null;
  is_group: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  participants: Array<{
    id: string;
    user_id: string;
    is_admin: boolean;
    profiles: {
      full_name: string | null;
      username: string | null;
      avatar_url: string | null;
    };
  }>;
  messages: Array<{
    id: string;
    content: string;
    sender_id: string;
    created_at: string;
    profiles: {
      full_name: string | null;
      username: string | null;
    };
  }>;
}

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          participants:conversation_participants(
            id,
            user_id,
            is_admin,
            profiles(full_name, username, avatar_url)
          ),
          messages(
            id,
            content,
            sender_id,
            created_at,
            profiles(full_name, username)
          )
        `)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch conversations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createDirectMessage = async (userId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Check if DM already exists
      const { data: existingConversation } = await supabase
        .from('conversations')
        .select(`
          id,
          participants:conversation_participants(user_id)
        `)
        .eq('is_group', false);

      const existing = existingConversation?.find(conv => 
        conv.participants.length === 2 &&
        conv.participants.some(p => p.user_id === userId) &&
        conv.participants.some(p => p.user_id === user.id)
      );

      if (existing) {
        return existing.id;
      }

      // Create new DM
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .insert({ 
          is_group: false,
          created_by: user.id 
        })
        .select()
        .single();

      if (convError) throw convError;

      // Add participants
      const { error: participantError } = await supabase
        .from('conversation_participants')
        .insert([
          { conversation_id: conversation.id, user_id: userId },
          { conversation_id: conversation.id, user_id: user.id }
        ]);

      if (participantError) throw participantError;

      fetchConversations();
      return conversation.id;
    } catch (error) {
      console.error('Error creating DM:', error);
      toast({
        title: "Error",
        description: "Failed to create direct message",
        variant: "destructive",
      });
    }
  };

  const createGroup = async (name: string, userIds: string[]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .insert({ 
          name, 
          is_group: true,
          created_by: user.id 
        })
        .select()
        .single();

      if (convError) throw convError;

      const participants = [
        { conversation_id: conversation.id, user_id: user.id, is_admin: true },
        ...userIds.map(userId => ({ 
          conversation_id: conversation.id, 
          user_id: userId, 
          is_admin: false 
        }))
      ];

      const { error: participantError } = await supabase
        .from('conversation_participants')
        .insert(participants);

      if (participantError) throw participantError;

      toast({
        title: "Success",
        description: "Group created successfully",
      });

      fetchConversations();
      return conversation.id;
    } catch (error) {
      console.error('Error creating group:', error);
      toast({
        title: "Error",
        description: "Failed to create group",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async (conversationId: string, content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          content,
          sender_id: user.id,
        });

      if (error) throw error;

      // Update conversation updated_at
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);

      fetchConversations();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return {
    conversations,
    loading,
    createDirectMessage,
    createGroup,
    sendMessage,
    refetch: fetchConversations,
  };
};
