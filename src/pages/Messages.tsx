
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatList from '@/components/ChatList';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Messages = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="gradient-text mb-4">Messages</h1>
            <p className="text-xl text-foreground/70">
              Connect with your community through direct messages and group chats.
            </p>
          </div>

          <ChatList />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Messages;
