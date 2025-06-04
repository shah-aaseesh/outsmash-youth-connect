
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Clock, Users, Calendar, ExternalLink, Bookmark } from 'lucide-react';

const OpportunityDetail = () => {
  const { id } = useParams();

  // Mock data - in a real app, this would come from an API
  const opportunityData: { [key: string]: any } = {
    '1': {
      title: "Software Engineering Intern",
      company: "TechStart Inc.",
      type: "Internship",
      location: "Remote",
      duration: "3 months",
      applicants: 45,
      deadline: "Dec 15, 2024",
      tags: ["React", "Node.js", "JavaScript", "Remote"],
      description: "Join our team to work on cutting-edge web applications using React and Node.js. Perfect for students interested in full-stack development.",
      fullDescription: "As a Software Engineering Intern at TechStart Inc., you'll be an integral part of our development team, working on real-world projects that impact thousands of users. You'll gain hands-on experience with modern web technologies including React, Node.js, and cloud platforms. This internship offers mentorship from senior engineers, code review sessions, and the opportunity to contribute to open-source projects.",
      requirements: [
        "Currently enrolled in Computer Science or related field",
        "Basic knowledge of JavaScript and web development",
        "Familiarity with React or similar frameworks",
        "Strong problem-solving skills",
        "Excellent communication skills"
      ],
      benefits: [
        "Competitive stipend",
        "Mentorship from industry experts",
        "Flexible remote work",
        "Professional development opportunities",
        "Potential for full-time offer"
      ],
      applicationProcess: "Submit your resume, cover letter, and a portfolio of your projects. Selected candidates will be invited for a technical interview.",
      companyInfo: "TechStart Inc. is a fast-growing startup focused on building innovative web solutions for small businesses."
    },
    '2': {
      title: "NASA USRP Research Program",
      company: "NASA",
      type: "Research",
      location: "California",
      duration: "10 weeks",
      applicants: 128,
      deadline: "Jan 31, 2025",
      tags: ["Research", "Aerospace", "STEM", "Prestigious"],
      description: "Undergraduate Student Research Program offering hands-on experience in aerospace engineering and space science research.",
      fullDescription: "The NASA Undergraduate Student Research Program (USRP) provides a unique opportunity to work alongside NASA scientists and engineers on cutting-edge research projects. Students will contribute to real NASA missions and gain invaluable experience in aerospace engineering, space science, and technology development.",
      requirements: [
        "U.S. citizen",
        "Enrolled in undergraduate program",
        "Minimum 3.0 GPA",
        "STEM major (Engineering, Physics, Mathematics, etc.)",
        "Strong academic record"
      ],
      benefits: [
        "Stipend of $6,000",
        "Housing assistance",
        "Access to NASA facilities",
        "Networking with NASA professionals",
        "Certificate of completion"
      ],
      applicationProcess: "Complete online application including transcripts, two letters of recommendation, and a personal statement describing your research interests.",
      companyInfo: "NASA is the United States government agency responsible for the civilian space program, aeronautics research, and space research."
    }
  };

  const opportunity = opportunityData[id || '1'] || opportunityData['1'];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/opportunities" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-6 transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Opportunities</span>
          </Link>

          {/* Header */}
          <div className="glass rounded-xl p-8 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{opportunity.title}</h1>
                <p className="text-xl text-foreground/80 font-semibold">{opportunity.company}</p>
              </div>
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-lg px-4 py-2">
                {opportunity.type}
              </Badge>
            </div>

            {/* Meta Information */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-foreground/70">
                <MapPin size={16} />
                <span>{opportunity.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground/70">
                <Clock size={16} />
                <span>{opportunity.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground/70">
                <Users size={16} />
                <span>{opportunity.applicants} applicants</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground/70">
                <Calendar size={16} />
                <span>Due: {opportunity.deadline}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {opportunity.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="border-white/20 text-foreground/70">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 flex-1 md:flex-none">
                <ExternalLink className="mr-2" size={20} />
                Apply Now
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-foreground hover:bg-white/10">
                <Bookmark className="mr-2" size={20} />
                Save for Later
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="glass rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">About This Opportunity</h2>
                <p className="text-foreground/80 leading-relaxed">{opportunity.fullDescription}</p>
              </div>

              {/* Requirements */}
              <div className="glass rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {opportunity.requirements.map((req: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2 text-foreground/80">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application Process */}
              <div className="glass rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">How to Apply</h2>
                <p className="text-foreground/80 leading-relaxed">{opportunity.applicationProcess}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Benefits */}
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">What You'll Get</h3>
                <ul className="space-y-2">
                  {opportunity.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2 text-foreground/80">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Info */}
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">About {opportunity.company}</h3>
                <p className="text-foreground/80 text-sm leading-relaxed">{opportunity.companyInfo}</p>
              </div>

              {/* Quick Apply */}
              <div className="glass rounded-xl p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    Apply Now
                  </Button>
                  <Button variant="outline" className="w-full border-white/20 text-foreground hover:bg-white/10">
                    Save for Later
                  </Button>
                  <Button variant="ghost" className="w-full text-foreground/70 hover:text-primary">
                    Share Opportunity
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OpportunityDetail;
