import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, X, Save, Eye, PenTool } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';

const CreateBlog = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isPreview, setIsPreview] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [] as string[]
  });

  const [newTag, setNewTag] = useState('');

  const categories = [
    'Tips',
    'Experiences', 
    'Campus Life',
    'Study Abroad',
    'Career',
    'Personal Development',
    'Technology',
    'Creative'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim()) && formData.tags.length < 8) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/auth');
      return;
    }

    // Here you would typically save to your backend
    console.log('Saving blog:', formData);
    
    // For now, just navigate back to blogs
    navigate('/blogs');
  };

  const handleSaveDraft = () => {
    // Save as draft functionality
    console.log('Saving draft:', formData);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <section className="pt-24 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="p-8">
                <PenTool className="mx-auto mb-4 text-muted-foreground" size={48} />
                <h2 className="text-2xl font-bold mb-4">Login Required</h2>
                <p className="text-muted-foreground mb-6">
                  You need to be logged in to create a blog post.
                </p>
                <Button 
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  Sign In / Sign Up
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/blogs')}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="mr-2" size={16} />
                Back
              </Button>
              <h1 className="text-3xl font-bold">
                Create <span className="gradient-text">Blog Post</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={handleSaveDraft}
                className="hover:bg-primary/10"
              >
                <Save className="mr-2" size={16} />
                Save Draft
              </Button>
              <Button 
                variant="outline"
                onClick={() => setIsPreview(!isPreview)}
                className="hover:bg-primary/10"
              >
                <Eye className="mr-2" size={16} />
                {isPreview ? 'Edit' : 'Preview'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Editor */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  {!isPreview ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Title */}
                      <div>
                        <Label htmlFor="title" className="text-sm font-medium">
                          Title *
                        </Label>
                        <Input
                          id="title"
                          placeholder="Write an engaging title..."
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          className="mt-2 text-lg"
                          required
                        />
                      </div>

                      {/* Excerpt */}
                      <div>
                        <Label htmlFor="excerpt" className="text-sm font-medium">
                          Excerpt *
                        </Label>
                        <Textarea
                          id="excerpt"
                          placeholder="Write a brief description that will appear in the blog list..."
                          value={formData.excerpt}
                          onChange={(e) => handleInputChange('excerpt', e.target.value)}
                          className="mt-2"
                          rows={3}
                          required
                        />
                      </div>

                      {/* Content */}
                      <div>
                        <Label htmlFor="content" className="text-sm font-medium">
                          Content *
                        </Label>
                        <Textarea
                          id="content"
                          placeholder="Write your blog content here... You can use basic HTML tags."
                          value={formData.content}
                          onChange={(e) => handleInputChange('content', e.target.value)}
                          className="mt-2 min-h-[400px] font-mono"
                          required
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Tip: Use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt; to format your content
                        </p>
                      </div>

                      {/* Submit Button */}
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                      >
                        <PenTool className="mr-2" size={16} />
                        Publish Blog
                      </Button>
                    </form>
                  ) : (
                    /* Preview Mode */
                    <div className="space-y-6">
                      <h1 className="text-3xl font-bold">{formData.title || 'Your Blog Title'}</h1>
                      <p className="text-lg text-muted-foreground">{formData.excerpt || 'Your blog excerpt will appear here...'}</p>
                      <div 
                        className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground"
                        dangerouslySetInnerHTML={{ 
                          __html: formData.content || '<p>Your blog content will appear here...</p>' 
                        }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Category Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tags</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      onClick={addTag}
                      size="sm"
                      variant="outline"
                    >
                      Add
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeTag(tag)}
                      >
                        #{tag}
                        <X size={12} className="ml-1" />
                      </Badge>
                    ))}
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Add up to 8 tags to help people discover your blog
                  </p>
                </CardContent>
              </Card>

              {/* Writing Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Writing Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>• Use a compelling headline that grabs attention</p>
                  <p>• Start with a strong opening paragraph</p>
                  <p>• Break up text with headings and bullet points</p>
                  <p>• Include personal experiences and examples</p>
                  <p>• End with a clear takeaway or call to action</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreateBlog;