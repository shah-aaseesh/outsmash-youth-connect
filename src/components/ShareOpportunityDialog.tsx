
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Share2, Facebook, MessageCircle, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ShareOpportunityDialogProps {
  opportunity: {
    id: string;
    title: string;
    company: string;
  };
}

const ShareOpportunityDialog = ({ opportunity }: ShareOpportunityDialogProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const currentUrl = `${window.location.origin}/opportunities/${opportunity.id}`;
  const shareText = `Check out this opportunity: ${opportunity.title} at ${opportunity.company}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The opportunity link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 size={16} className="mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share Opportunity</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm">{opportunity.title}</h4>
            <p className="text-sm text-muted-foreground">{opportunity.company}</p>
          </div>

          <div className="space-y-2">
            <Button 
              onClick={shareOnFacebook}
              variant="outline" 
              className="w-full justify-start"
            >
              <Facebook size={16} className="mr-3 text-blue-600" />
              Share on Facebook
            </Button>

            <Button 
              onClick={shareOnWhatsApp}
              variant="outline" 
              className="w-full justify-start"
            >
              <MessageCircle size={16} className="mr-3 text-green-600" />
              Share on WhatsApp
            </Button>

            <Button 
              onClick={copyToClipboard}
              variant="outline" 
              className="w-full justify-start"
            >
              {copied ? (
                <Check size={16} className="mr-3 text-green-600" />
              ) : (
                <Copy size={16} className="mr-3" />
              )}
              {copied ? "Link Copied!" : "Copy Link"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareOpportunityDialog;
