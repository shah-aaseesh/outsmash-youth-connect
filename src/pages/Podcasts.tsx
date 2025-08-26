import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Heart, MessageCircle, Share, Calendar, Clock, ExternalLink } from 'lucide-react';

const Podcasts = () => {
  const [likedEpisodes, setLikedEpisodes] = useState<string[]>([]);

  // Mock podcast data - replace with real YouTube API data
  const episodes = [
    {
      id: '1',
      title: 'From High School to Silicon Valley: A Gap Year Success Story',
      description: 'Join us as we interview Priya, a Nepali student who used her gap year to learn coding, build amazing projects, and land an internship at a top tech company.',
      thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=225&fit=crop',
      duration: '32:45',
      publishedAt: '2024-01-15',
      views: '12.5K',
      likes: 342,
      comments: 67,
      tags: ['Career', 'Tech', 'Gap Year', 'Success Story'],
      youtubeId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      category: 'Career'
    },
    {
      id: '2',
      title: 'Study Abroad Myths Busted: What They Don\'t Tell You',
      description: 'We break down common misconceptions about studying abroad and share real experiences from students who made the leap.',
      thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=225&fit=crop',
      duration: '28:12',
      publishedAt: '2024-01-10',
      views: '8.9K',
      likes: 234,
      comments: 45,
      tags: ['Study Abroad', 'Education', 'International', 'Tips'],
      youtubeId: 'dQw4w9WgXcQ',
      category: 'Education'
    },
    {
      id: '3',
      title: 'Building Your Personal Brand as a Student',
      description: 'Learn how to create a compelling online presence that opens doors to opportunities, from social media to portfolio building.',
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop',
      duration: '24:38',
      publishedAt: '2024-01-05',
      views: '15.2K',
      likes: 456,
      comments: 89,
      tags: ['Personal Branding', 'Social Media', 'Career', 'Digital Marketing'],
      youtubeId: 'dQw4w9WgXcQ',
      category: 'Personal Development'
    },
    {
      id: '4',
      title: 'Scholarship Hunting: Strategies That Actually Work',
      description: 'Discover proven methods to find and win scholarships, including insider tips from scholarship committee members.',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop',
      duration: '35:21',
      publishedAt: '2024-01-01',
      views: '22.1K',
      likes: 678,
      comments: 123,
      tags: ['Scholarships', 'Education', 'Funding', 'Students'],
      youtubeId: 'dQw4w9WgXcQ',
      category: 'Education'
    }
  ];

  const categories = ['All', 'Career', 'Education', 'Personal Development'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEpisodes = episodes.filter(episode => 
    selectedCategory === 'All' || episode.category === selectedCategory
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleLike = (episodeId: string) => {
    setLikedEpisodes(prev => 
      prev.includes(episodeId) 
        ? prev.filter(id => id !== episodeId)
        : [...prev, episodeId]
    );
  };

  const handlePlay = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Outsmash <span className="gradient-text">Podcasts</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Student stories, career advice, and insights to help you succeed
            </p>
          </div>

          {/* Featured Episode */}
          {episodes.length > 0 && (
            <Card className="community-card mb-8 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative group cursor-pointer" onClick={() => handlePlay(episodes[0].youtubeId)}>
                  <img 
                    src={episodes[0].thumbnail} 
                    alt={episodes[0].title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button size="lg" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
                      <Play className="mr-2" size={20} />
                      Play Episode
                    </Button>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
                    {episodes[0].duration}
                  </div>
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                    Featured
                  </Badge>
                </div>
                <div className="p-8">
                  <CardTitle className="text-2xl mb-4">{episodes[0].title}</CardTitle>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {episodes[0].description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(episodes[0].publishedAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {episodes[0].duration}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {episodes[0].tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <Button 
                      onClick={() => handlePlay(episodes[0].youtubeId)}
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    >
                      <Play className="mr-2" size={16} />
                      Listen Now
                    </Button>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{episodes[0].views} views</span>
                      <span>{episodes[0].likes} likes</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Category Filter */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category 
                      ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90' 
                      : 'hover:bg-primary hover:text-primary-foreground'
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Episode Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEpisodes.slice(1).map((episode) => (
              <Card key={episode.id} className="community-card group overflow-hidden">
                <div className="relative cursor-pointer" onClick={() => handlePlay(episode.youtubeId)}>
                  <img 
                    src={episode.thumbnail} 
                    alt={episode.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button size="sm" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
                      <Play size={16} />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {episode.duration}
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {episode.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {episode.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(episode.publishedAt)}
                    </div>
                    <span>{episode.views} views</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {episode.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                    {episode.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{episode.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(episode.id);
                        }}
                        className={`flex items-center gap-1 hover:text-accent transition-colors ${
                          likedEpisodes.includes(episode.id) ? 'text-accent' : ''
                        }`}
                      >
                        <Heart 
                          size={12} 
                          className={likedEpisodes.includes(episode.id) ? 'fill-current' : ''} 
                        />
                        {episode.likes}
                      </button>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={12} />
                        {episode.comments}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlay(episode.youtubeId);
                      }}
                    >
                      <ExternalLink size={12} className="mr-1" />
                      Watch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Podcasts;