
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
}

export interface ConversationParticipant {
  id: string;
  conversation_id: string;
  user_id: string;
  is_admin: boolean;
  joined_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: string;
  created_at: string;
  updated_at: string;
}

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [participants, setParticipants] = useState<ConversationParticipant[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchConversations = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch conversations where user is a participant
      const { data: userParticipations } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', user.id);

      if (!userParticipations) return;

      const conversationIds = userParticipations.map(p => p.conversation_id);

      if (conversationIds.length === 0) {
        setConversations([]);
        setLoading(false);
        return;
      }

      // Fetch conversations
      const { data: conversationsData, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .in('id', conversationIds)
        .order('updated_at', { ascending: false });

      if (convError) throw convError;

      // Fetch all participants
      const { data: participantsData, error: partError } = await supabase
        .from('conversation_participants')
        .select('*')
        .in('conversation_id', conversationIds);

      if (partError) throw partError;

      // Fetch all messages
      const { data: messagesData, error: msgError } = await supabase
        .from('messages')
        .select('*')
        .in('conversation_id', conversationIds)
        .order('created_at', { ascending: true });

      if (msgError) throw msgError;

      setConversations(conversationsData || []);
      setParticipants(participantsData || []);
      setMessages(messagesData || []);
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
      const { data: existingParticipations } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', user.id);

      if (existingParticipations) {
        for (const participation of existingParticipations) {
          const { data: allParticipants } = await supabase
            .from('conversation_participants')
            .select('user_id')
            .eq('conversation_id', participation.conversation_id);

          if (allParticipants && allParticipants.length === 2) {
            const userIds = allParticipants.map(p => p.user_id);
            if (userIds.includes(userId) && userIds.includes(user.id)) {
              return participation.conversation_id;
            }
          }
        }
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

      const participantData = [
        { conversation_id: conversation.id, user_id: user.id, is_admin: true },
        ...userIds.map(userId => ({ 
          conversation_id: conversation.id, 
          user_id: userId, 
          is_admin: false 
        }))
      ];

      const { error: participantError } = await supabase
        .from('conversation_participants')
        .insert(participantData);

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

  const getConversationParticipants = (conversationId: string) => {
    return participants.filter(p => p.conversation_id === conversationId);
  };

  const getConversationMessages = (conversationId: string) => {
    return messages.filter(m => m.conversation_id === conversationId);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return {
    conversations,
    participants,
    messages,
    loading,
    createDirectMessage,
    createGroup,
    sendMessage,
    getConversationParticipants,
    getConversationMessages,
    refetch: fetchConversations,
  };
};
