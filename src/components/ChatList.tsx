
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { useConversations, Conversation } from '@/hooks/useConversations';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ChatList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { conversations, loading } = useConversations();
  const { user } = useAuth();
  const navigate = useNavigate();

  const filteredConversations = conversations.filter(conversation => {
    if (!searchQuery) return true;
    
    if (conversation.is_group && conversation.name) {
      return conversation.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      // For DMs, search by participant names
      const otherParticipant = conversation.participants.find(p => p.user_id !== user?.id);
      return otherParticipant?.profiles.full_name?.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getConversationTitle = (conversation: Conversation) => {
    if (conversation.is_group) {
      return conversation.name || 'Group Chat';
    } else {
      const otherParticipant = conversation.participants.find(p => p.user_id !== user?.id);
      return otherParticipant?.profiles.full_name || 'Unknown User';
    }
  };

  const getLastMessage = (conversation: Conversation) => {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (!lastMessage) return 'No messages yet';
    
    const senderName = lastMessage.sender_id === user?.id ? 'You' : lastMessage.profiles.full_name || 'Unknown';
    return `${senderName}: ${lastMessage.content}`;
  };

  if (loading) {
    return (
      <Card className="glass border-white/20">
        <CardContent className="p-6">
          <div className="text-center">Loading conversations...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare size={20} />
            <span>Messages</span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/messages/new')}
          >
            <Plus size={16} className="mr-2" />
            New
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/40" size={16} />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass border-white/20"
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {filteredConversations.length === 0 ? (
          <div className="p-6 text-center text-foreground/60">
            {searchQuery ? 'No conversations found' : 'No conversations yet'}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => navigate(`/messages/${conversation.id}`)}
                className="p-4 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/10 last:border-b-0"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">
                      {getConversationTitle(conversation)}
                    </h4>
                    {conversation.is_group && (
                      <Badge variant="secondary" className="text-xs">
                        <Users size={12} className="mr-1" />
                        {conversation.participants.length}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-foreground/60">
                    {formatTimeAgo(conversation.updated_at)}
                  </span>
                </div>
                <p className="text-sm text-foreground/70 truncate">
                  {getLastMessage(conversation)}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatList;
