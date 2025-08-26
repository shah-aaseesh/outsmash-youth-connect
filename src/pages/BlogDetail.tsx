import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share, Calendar, Clock, ArrowLeft, Bookmark } from 'lucide-react';
import { useState } from 'react';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock blog data - replace with real data from your backend
  const blog = {
    id: id,
    title: 'My Journey from High School to Tech: A Gap Year Story',
    content: `
      <p>Taking a gap year was one of the scariest yet most rewarding decisions I've ever made. As a high school graduate from Nepal, I felt the pressure to immediately continue my education. However, I decided to take a different path.</p>
      
      <h2>The Decision</h2>
      <p>After completing my +2 in Science, I realized I wasn't ready to jump into another academic program. I wanted to explore my interests, gain practical experience, and figure out what truly excited me.</p>
      
      <h2>Learning to Code</h2>
      <p>I started with online courses on platforms like freeCodeCamp and Coursera. Within three months, I had built my first web application - a simple todo app that I was incredibly proud of.</p>
      
      <h2>Building Projects</h2>
      <p>Over the next six months, I built over 10 projects including:</p>
      <ul>
        <li>A local business directory for my hometown</li>
        <li>A budget tracking app for students</li>
        <li>A portfolio website showcasing my work</li>
      </ul>
      
      <h2>Landing the Internship</h2>
      <p>My persistence paid off when I landed an internship at a growing tech startup in Kathmandu. The experience was invaluable - I learned about real-world software development, worked with a team, and contributed to products used by thousands of people.</p>
      
      <h2>Key Takeaways</h2>
      <p>If you're considering a gap year, here's my advice:</p>
      <ul>
        <li>Have a plan, but be flexible</li>
        <li>Focus on building skills, not just consuming content</li>
        <li>Network and connect with people in your field of interest</li>
        <li>Document your journey - it becomes a great story to tell</li>
      </ul>
      
      <p>My gap year taught me more about myself and the industry than any textbook could. It set the foundation for my career and gave me the confidence to pursue my dreams.</p>
    `,
    author: {
      name: 'Priya Sharma',
      avatar: null,
      username: '@priya_dev',
      bio: 'Full-stack developer passionate about AI and sustainability'
    },
    publishedAt: '2024-01-15',
    readTime: 5,
    likes: 42,
    comments: 8,
    shares: 15,
    tags: ['Gap Year', 'Tech', 'Programming', 'Career', 'Nepal'],
    category: 'Experiences'
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/blogs')}
            className="mb-6 hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Blogs
          </Button>

          {/* Article */}
          <Card className="student-card">
            <CardHeader>
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={blog.author.avatar || undefined} />
                  <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">
                    {getInitials(blog.author.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold">{blog.author.name}</h4>
                  <p className="text-sm text-muted-foreground">{blog.author.username}</p>
                </div>
                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </div>

              {/* Article Meta */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {formatDate(blog.publishedAt)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {blog.readTime} min read
                </div>
                <Badge variant="secondary" className="text-xs">
                  {blog.category}
                </Badge>
              </div>

              {/* Title */}
              <CardTitle className="text-3xl md:text-4xl leading-tight mb-4">
                {blog.title}
              </CardTitle>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4 border-t">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? 'text-accent' : ''}
                >
                  <Heart size={16} className={`mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  {blog.likes + (isLiked ? 1 : 0)}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle size={16} className="mr-2" />
                  {blog.comments}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share size={16} className="mr-2" />
                  {blog.shares}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={isBookmarked ? 'text-accent' : ''}
                >
                  <Bookmark size={16} className={`mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Author Card */}
              <Card className="mt-12 bg-muted/30">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={blog.author.avatar || undefined} />
                      <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white text-lg">
                        {getInitials(blog.author.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2">{blog.author.name}</h4>
                      <p className="text-muted-foreground mb-3">{blog.author.bio}</p>
                      <div className="flex gap-3">
                        <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                          Follow
                        </Button>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetail;