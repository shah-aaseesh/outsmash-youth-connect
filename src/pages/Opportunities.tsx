
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import OpportunityCard from '@/components/OpportunityCard';
import AddOpportunityModal from '@/components/AddOpportunityModal';
import { useOpportunities } from '@/hooks/useOpportunities';
import { Skeleton } from '@/components/ui/skeleton';

const Opportunities = () => {
  const { opportunities, loading } = useOpportunities();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="gradient-text mb-4">Opportunities</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
              Discover internships, research programs, and amazing opportunities tailored for students.
            </p>
            <AddOpportunityModal />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full" />
                </div>
              ))}
            </div>
          ) : opportunities.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60">No opportunities available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.id} {...opportunity} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Opportunities;
