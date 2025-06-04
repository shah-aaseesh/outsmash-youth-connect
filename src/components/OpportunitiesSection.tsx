
import { Button } from '@/components/ui/button';
import OpportunityCard from './OpportunityCard';
import { ArrowRight } from 'lucide-react';

const OpportunitiesSection = () => {
  const opportunities = [
    {
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
      title: "Global Youth Leadership Summit",
      company: "United Nations",
      type: "Program",
      location: "New York",
      duration: "1 week",
      applicants: 89,
      description: "Intensive leadership program focused on global issues, sustainable development, and international cooperation.",
      tags: ["Leadership", "Global", "Networking", "Travel"],
      deadline: "Feb 28, 2025"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="gradient-text mb-4">Discover Amazing Opportunities</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            From internships to research programs, find opportunities that match your interests and career goals.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {opportunities.map((opportunity, index) => (
            <OpportunityCard key={index} {...opportunity} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300 group"
          >
            View All Opportunities
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;
