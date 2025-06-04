
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import OpportunityCard from '@/components/OpportunityCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

const Opportunities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const allOpportunities = [
    {
      id: '1',
      title: "Software Engineering Intern",
      company: "TechStart Inc.",
      type: "Internship",
      location: "Remote",
      duration: "3 months",
      applicants: 45,
      description: "Join our team to work on cutting-edge web applications using React and Node.js. Perfect for students interested in full-stack development.",
      tags: ["React", "Node.js", "JavaScript", "Remote"],
      deadline: "Dec 15, 2024"
    },
    {
      id: '2',
      title: "NASA USRP Research Program",
      company: "NASA",
      type: "Research",
      location: "California",
      duration: "10 weeks",
      applicants: 128,
      description: "Undergraduate Student Research Program offering hands-on experience in aerospace engineering and space science research.",
      tags: ["Research", "Aerospace", "STEM", "Prestigious"],
      deadline: "Jan 31, 2025"
    },
    {
      id: '3',
      title: "Global Youth Leadership Summit",
      company: "United Nations",
      type: "Program",
      location: "New York",
      duration: "1 week",
      applicants: 89,
      description: "Intensive leadership program focused on global issues, sustainable development, and international cooperation.",
      tags: ["Leadership", "Global", "Networking", "Travel"],
      deadline: "Feb 28, 2025"
    },
    {
      id: '4',
      title: "Google Summer of Code",
      company: "Google",
      type: "Program",
      location: "Remote",
      duration: "12 weeks",
      applicants: 256,
      description: "Work with open source organizations on exciting projects while being mentored by experienced developers.",
      tags: ["Open Source", "Programming", "Mentorship", "Remote"],
      deadline: "Mar 15, 2025"
    },
    {
      id: '5',
      title: "Climate Action Challenge",
      company: "Climate Foundation",
      type: "Competition",
      location: "Global",
      duration: "6 months",
      applicants: 78,
      description: "Design innovative solutions to combat climate change and win prizes up to $10,000.",
      tags: ["Climate", "Innovation", "Sustainability", "Prize"],
      deadline: "Apr 10, 2025"
    },
    {
      id: '6',
      title: "Medical Research Internship",
      company: "Johns Hopkins",
      type: "Internship",
      location: "Maryland",
      duration: "8 weeks",
      applicants: 167,
      description: "Assist in groundbreaking medical research in our state-of-the-art laboratories.",
      tags: ["Medical", "Research", "Lab Work", "Healthcare"],
      deadline: "Jan 20, 2025"
    }
  ];

  const filteredOpportunities = allOpportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter === 'all' || opportunity.type.toLowerCase() === typeFilter;
    const matchesLocation = locationFilter === 'all' || opportunity.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="gradient-text mb-4">Discover Amazing Opportunities</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Find internships, research programs, competitions, and scholarships tailored to your interests and career goals.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-xl p-6 space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Filter size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Filter Opportunities</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={16} />
                <Input
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-foreground placeholder:text-foreground/50"
                />
              </div>

              {/* Type Filter */}
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-foreground">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-card border-white/20">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="program">Program</SelectItem>
                  <SelectItem value="competition">Competition</SelectItem>
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-foreground">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-card border-white/20">
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="california">California</SelectItem>
                  <SelectItem value="new york">New York</SelectItem>
                  <SelectItem value="maryland">Maryland</SelectItem>
                  <SelectItem value="global">Global</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('all');
                  setLocationFilter('all');
                }}
                className="border-white/20 text-foreground hover:bg-white/10"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <p className="text-foreground/70">
              Showing {filteredOpportunities.length} of {allOpportunities.length} opportunities
            </p>
          </div>

          {filteredOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <Link key={opportunity.id} to={`/opportunities/${opportunity.id}`}>
                  <OpportunityCard {...opportunity} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-foreground mb-4">No opportunities found</h3>
              <p className="text-foreground/70 mb-6">Try adjusting your filters or search terms.</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('all');
                  setLocationFilter('all');
                }}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Opportunities;
