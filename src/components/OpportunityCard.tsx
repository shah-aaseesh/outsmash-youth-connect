
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShareOpportunityDialog from './ShareOpportunityDialog';

interface OpportunityCardProps {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  duration: string;
  description: string;
  tags?: string[];
  deadline: string;
  apply_url?: string;
}

const OpportunityCard = ({
  id,
  title,
  company,
  type,
  location,
  duration,
  description,
  tags = [],
  deadline,
  apply_url
}: OpportunityCardProps) => {
  return (
    <div className="glass glass-hover rounded-xl p-6 space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <Link to={`/opportunities/${id}`}>
            <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
              {title}
            </h3>
          </Link>
          <p className="text-foreground/70 font-medium">{company}</p>
        </div>
        <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
          {type}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-foreground/60 text-sm leading-relaxed line-clamp-3">
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs border-white/20 text-foreground/70">
              {tag}
            </Badge>
          ))}
          {tags.length > 4 && (
            <Badge variant="outline" className="text-xs border-white/20 text-foreground/70">
              +{tags.length - 4} more
            </Badge>
          )}
        </div>
      )}

      {/* Meta Information */}
      <div className="flex items-center justify-between text-sm text-foreground/60">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <MapPin size={14} />
            <span>{location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{duration}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-sm text-foreground/60">
          <Calendar size={14} />
          <span>Deadline: <span className="text-primary">{deadline}</span></span>
        </div>
        <div className="flex space-x-2">
          <ShareOpportunityDialog opportunity={{ id, title, company }} />
          <Link to={`/opportunities/${id}`}>
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </Link>
          {apply_url && (
            <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90" asChild>
              <a href={apply_url} target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
