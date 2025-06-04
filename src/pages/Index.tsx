
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import OpportunitiesSection from '@/components/OpportunitiesSection';
import CommunityPreview from '@/components/CommunityPreview';
import AchievementShowcase from '@/components/AchievementShowcase';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <OpportunitiesSection />
      <CommunityPreview />
      <AchievementShowcase />
      <Footer />
    </div>
  );
};

export default Index;
