
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users } from 'lucide-react';

interface OpportunityCardProps {
  title: string;
  company: string;
  type: string;
  location: string;
  duration: string;
  applicants: number;
  description: string;
  tags: string[];
  deadline: string;
}

const OpportunityCard = ({
  title,
  company,
  type,
  location,
  duration,
  applicants,
  description,
  tags,
  deadline
}: OpportunityCardProps) => {
  return (
    <div className="glass glass-hover rounded-xl p-6 space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="text-foreground/70 font-medium">{company}</p>
        </div>
        <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
          {type}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-foreground/60 text-sm leading-relaxed">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="outline" className="text-xs border-white/20 text-foreground/70">
            {tag}
          </Badge>
        ))}
      </div>

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
          <div className="flex items-center space-x-1">
            <Users size={14} />
            <span>{applicants} applicants</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <span className="text-sm text-foreground/60">
          Deadline: <span className="text-primary">{deadline}</span>
        </span>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-primary">
            Save
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
