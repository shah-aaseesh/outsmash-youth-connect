
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, MapPin, Clock, Calendar } from 'lucide-react';
import { useOpportunities, Opportunity } from '@/hooks/useOpportunities';
import { Skeleton } from '@/components/ui/skeleton';
import ShareOpportunityDialog from '@/components/ShareOpportunityDialog';

const OpportunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getOpportunityById } = useOpportunities();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunity = async () => {
      if (id) {
        const data = await getOpportunityById(id);
        setOpportunity(data);
        setLoading(false);
      }
    };

    fetchOpportunity();
  }, [id, getOpportunityById]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <section className="pt-24 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-48 w-full" />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <section className="pt-24 pb-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Opportunity Not Found</h1>
            <p className="text-foreground/60 mb-8">The opportunity you're looking for doesn't exist.</p>
            <Link to="/opportunities">
              <Button variant="outline">
                <ArrowLeft size={16} className="mr-2" />
                Back to Opportunities
              </Button>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/opportunities" className="inline-block mb-6">
            <Button variant="ghost" className="text-foreground/70 hover:text-primary">
              <ArrowLeft size={16} className="mr-2" />
              Back to Opportunities
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{opportunity.title}</h1>
                <p className="text-xl text-foreground/70">{opportunity.company}</p>
              </div>
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                {opportunity.type}
              </Badge>
            </div>

            <div className="flex items-center gap-6 text-foreground/60 mb-6">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{opportunity.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{opportunity.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Deadline: {opportunity.deadline}</span>
              </div>
            </div>

            <div className="flex gap-4">
              {opportunity.apply_url && (
                <Button asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  <a href={opportunity.apply_url} target="_blank" rel="noopener noreferrer">
                    Apply Now
                    <ExternalLink size={16} className="ml-2" />
                  </a>
                </Button>
              )}
              <ShareOpportunityDialog opportunity={opportunity} />
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About This Opportunity */}
              {opportunity.full_description && (
                <Card className="glass border-white/20">
                  <CardHeader>
                    <CardTitle>About This Opportunity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                      {opportunity.full_description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Requirements */}
              {opportunity.requirements && opportunity.requirements.length > 0 && (
                <Card className="glass border-white/20">
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {opportunity.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-foreground/80">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* What You'll Get */}
              {opportunity.benefits && opportunity.benefits.length > 0 && (
                <Card className="glass border-white/20">
                  <CardHeader>
                    <CardTitle>What You'll Get</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {opportunity.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-foreground/80">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* How to Apply */}
              {opportunity.application_process && (
                <Card className="glass border-white/20">
                  <CardHeader>
                    <CardTitle>How to Apply</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                      {opportunity.application_process}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle>Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Type</h4>
                    <Badge variant="outline">{opportunity.type}</Badge>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Location</h4>
                    <p className="text-foreground/80">{opportunity.location}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Duration</h4>
                    <p className="text-foreground/80">{opportunity.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Deadline</h4>
                    <p className="text-foreground/80">{opportunity.deadline}</p>
                  </div>
                </CardContent>
              </Card>

              {/* About Company */}
              {opportunity.company_info && (
                <Card className="glass border-white/20">
                  <CardHeader>
                    <CardTitle>About {opportunity.company}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                      {opportunity.company_info}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Tags */}
              {opportunity.tags && opportunity.tags.length > 0 && (
                <Card className="glass border-white/20">
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OpportunityDetail;
