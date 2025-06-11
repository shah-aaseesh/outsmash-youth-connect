
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { useOpportunities } from '@/hooks/useOpportunities';

const AddOpportunityModal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    type: '',
    location: '',
    duration: '',
    deadline: '',
    description: '',
    full_description: '',
    application_process: '',
    company_info: '',
    apply_url: '',
  });
  const [requirements, setRequirements] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [newTag, setNewTag] = useState('');

  const { createOpportunity } = useOpportunities();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setBenefits([...benefits, newBenefit.trim()]);
      setNewBenefit('');
    }
  };

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const opportunityData = {
      ...formData,
      requirements,
      benefits,
      tags,
    };

    const success = await createOpportunity(opportunityData);
    if (success) {
      setOpen(false);
      // Reset form
      setFormData({
        title: '',
        company: '',
        type: '',
        location: '',
        duration: '',
        deadline: '',
        description: '',
        full_description: '',
        application_process: '',
        company_info: '',
        apply_url: '',
      });
      setRequirements([]);
      setBenefits([]);
      setTags([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
          <Plus className="mr-2" size={16} />
          Add Opportunity
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Opportunity</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Type *</Label>
              <Input
                id="type"
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                placeholder="e.g., Internship, Research, Program"
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="e.g., 3 months, 10 weeks"
                required
              />
            </div>
            <div>
              <Label htmlFor="deadline">Application Deadline *</Label>
              <Input
                id="deadline"
                value={formData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
                placeholder="e.g., Dec 15, 2024"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Short Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description for opportunity cards"
              required
            />
          </div>

          <div>
            <Label htmlFor="full_description">About This Opportunity</Label>
            <Textarea
              id="full_description"
              value={formData.full_description}
              onChange={(e) => handleInputChange('full_description', e.target.value)}
              placeholder="Detailed description of the opportunity"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="company_info">About the Company</Label>
            <Textarea
              id="company_info"
              value={formData.company_info}
              onChange={(e) => handleInputChange('company_info', e.target.value)}
              placeholder="Information about the company"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="application_process">How to Apply</Label>
            <Textarea
              id="application_process"
              value={formData.application_process}
              onChange={(e) => handleInputChange('application_process', e.target.value)}
              placeholder="Application process and instructions"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="apply_url">Application URL</Label>
            <Input
              id="apply_url"
              type="url"
              value={formData.apply_url}
              onChange={(e) => handleInputChange('apply_url', e.target.value)}
              placeholder="https://company.com/apply"
            />
          </div>

          {/* Requirements Section */}
          <div>
            <Label>Requirements</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                placeholder="Add a requirement"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
              />
              <Button type="button" onClick={addRequirement} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {requirements.map((req, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {req}
                  <X size={12} className="cursor-pointer" onClick={() => removeRequirement(index)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div>
            <Label>What You'll Get</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="Add a benefit"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
              />
              <Button type="button" onClick={addBenefit} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {benefits.map((benefit, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {benefit}
                  <X size={12} className="cursor-pointer" onClick={() => removeBenefit(index)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags Section */}
          <div>
            <Label>Tags</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {tag}
                  <X size={12} className="cursor-pointer" onClick={() => removeTag(index)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Create Opportunity
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOpportunityModal;
