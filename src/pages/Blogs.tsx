import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PenTool, Heart, MessageCircle, Share, Calendar, User, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Blogs = () => {
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();

  // Mock blog data - replace with real data from your backend
  const blogs = [
    {
      id: '1',
      title: 'My Journey from High School to Tech: A Gap Year Story',
      excerpt: 'How I used my gap year to learn programming, build projects, and land my first internship at a tech startup.',
      content: '...',
      author: {
        name: 'Priya Sharma',
        avatar: null,
        username: '@priya_dev'
      },
      category: 'Experiences',
      tags: ['Gap Year', 'Tech', 'Programming', 'Career'],
      publishedAt: '2024-01-15',
      readTime: 5,
      likes: 42,
      comments: 8,
      shares: 15
    },
    {
      id: '2',
      title: 'Study Abroad Guide: Everything You Need to Know',
      excerpt: 'A comprehensive guide covering applications, scholarships, visa processes, and what to expect when studying overseas.',
      content: '...',
      author: {
        name: 'Ravi Kumar',
        avatar: null,
        username: '@ravi_design'
      },
      category: 'Study Abroad',
      tags: ['Study Abroad', 'Scholarships', 'University', 'International'],
      publishedAt: '2024-01-12',
      readTime: 8,
      likes: 78,
      comments: 23,
      shares: 34
    },
    {
      id: '3',
      title: 'Campus Life Hacks: Making the Most of Your College Experience',
      excerpt: 'Tips and tricks I wish I knew before starting college - from time management to building meaningful relationships.',
      content: '...',
      author: {
        name: 'Sarah Wilson',
        avatar: null,
        username: '@sarah_writer'
      },
      category: 'Campus Life',
      tags: ['College', 'Tips', 'Productivity', 'Relationships'],
      publishedAt: '2024-01-10',
      readTime: 6,
      likes: 56,
      comments: 12,
      shares: 19
    }
  ];

  const categories = ['All', 'Tips', 'Experiences', 'Campus Life', 'Study Abroad', 'Career'];

  const filteredBlogs = blogs.filter(blog => 
    category === 'all' || blog.category.toLowerCase() === category.toLowerCase()
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleBlogClick = (blogId: string) => {
    navigate(`/blogs/${blogId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Student <span className="gradient-text">Voices</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Stories, tips, and experiences from students around the world
              </p>
            </div>
            <Button 
              onClick={() => navigate('/create-blog')}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              <Plus className="mr-2" size={16} />
              Write a Blog
            </Button>
          </div>

          {/* Category Filter */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={category === cat.toLowerCase() || (cat === 'All' && category === 'all') ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCategory(cat === 'All' ? 'all' : cat.toLowerCase())}
                    className={category === cat.toLowerCase() || (cat === 'All' && category === 'all') 
                      ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90' 
                      : 'hover:bg-primary hover:text-primary-foreground'
                    }
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Card 
                key={blog.id} 
                className="community-card cursor-pointer group"
                onClick={() => handleBlogClick(blog.id)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={blog.author.avatar || undefined} />
                      <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold">
                        {getInitials(blog.author.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{blog.author.name}</p>
                      <p className="text-xs text-muted-foreground">{blog.author.username}</p>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(blog.publishedAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <PenTool size={12} />
                      {blog.readTime} min read
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {blog.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                    {blog.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{blog.tags.length - 2} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart size={12} />
                      {blog.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={12} />
                      {blog.comments}
                    </div>
                    <div className="flex items-center gap-1">
                      <Share size={12} />
                      {blog.shares}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <PenTool className="mx-auto mb-4 text-muted-foreground" size={48} />
                <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
                <p className="text-muted-foreground">
                  Be the first to write about this topic!
                </p>
                <Button 
                  className="mt-4 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  onClick={() => navigate('/create-blog')}
                >
                  <Plus className="mr-2" size={16} />
                  Write a Blog
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blogs;