import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search as SearchIcon, Filter, Users, MapPin, GraduationCap } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const navigate = useNavigate();

  // Mock data - replace with real data from your backend
  const searchResults = [
    {
      id: '1',
      type: 'user',
      name: 'Priya Sharma',
      username: '@priya_dev',
      bio: 'Full-stack developer passionate about AI and sustainability',
      avatar: null,
      country: 'Nepal',
      school: 'Kathmandu University',
      interests: ['AI', 'Web Development', 'Sustainability', 'Music']
    },
    {
      id: '2',
      type: 'user',
      name: 'Ravi Kumar',
      username: '@ravi_design',
      bio: 'UI/UX Designer creating beautiful digital experiences',
      avatar: null,
      country: 'India',
      school: 'IIT Delhi',
      interests: ['Design', 'Photography', 'Travel', 'Tech']
    },
    {
      id: '3',
      type: 'user',
      name: 'Sarah Wilson',
      username: '@sarah_writer',
      bio: 'Content writer and digital marketing enthusiast',
      avatar: null,
      country: 'USA',
      school: 'Stanford University',
      interests: ['Writing', 'Marketing', 'Poetry', 'Books']
    }
  ];

  const filteredResults = searchResults.filter(result => {
    if (filterBy !== 'all' && result.type !== filterBy) return false;
    if (searchQuery && !result.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !result.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    return true;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Search Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Discover <span className="gradient-text">Amazing People</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect with students and professionals who share your interests
            </p>
          </div>

          {/* Search Controls */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    placeholder="Search by name, interests, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter size={16} className="mr-2" />
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Results</SelectItem>
                    <SelectItem value="user">People</SelectItem>
                    <SelectItem value="community">Communities</SelectItem>
                    <SelectItem value="blog">Blogs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          <div className="space-y-4">
            {filteredResults.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or filters
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredResults.map((result) => (
                <Card key={result.id} className="student-card cursor-pointer" onClick={() => handleUserClick(result.id)}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={result.avatar || undefined} />
                        <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white text-lg font-semibold">
                          {getInitials(result.name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">{result.name}</h3>
                          <span className="text-muted-foreground">{result.username}</span>
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{result.bio}</p>
                        
                        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            {result.country}
                          </div>
                          <div className="flex items-center gap-1">
                            <GraduationCap size={14} />
                            {result.school}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {result.interests.map((interest, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              #{interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-primary hover:text-primary-foreground"
                      >
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Search;