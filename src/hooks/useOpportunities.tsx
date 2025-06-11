
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  duration: string;
  deadline: string;
  description: string;
  full_description?: string;
  requirements?: string[];
  benefits?: string[];
  application_process?: string;
  company_info?: string;
  apply_url?: string;
  tags?: string[];
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export const useOpportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchOpportunities = async () => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOpportunities(data || []);
    } catch (error: any) {
      console.error('Error fetching opportunities:', error);
      toast({
        title: "Error",
        description: "Failed to load opportunities",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getOpportunityById = async (id: string): Promise<Opportunity | null> => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Error fetching opportunity:', error);
      toast({
        title: "Error",
        description: "Failed to load opportunity details",
        variant: "destructive",
      });
      return null;
    }
  };

  const createOpportunity = async (opportunityData: Omit<Opportunity, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
    try {
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "You must be logged in to create opportunities",
          variant: "destructive",
        });
        return false;
      }

      const dataWithUser = {
        ...opportunityData,
        created_by: user.id,
      };

      const { error } = await supabase
        .from('opportunities')
        .insert(dataWithUser);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Opportunity created successfully!",
      });

      fetchOpportunities();
      return true;
    } catch (error: any) {
      console.error('Error creating opportunity:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create opportunity",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  return {
    opportunities,
    loading,
    fetchOpportunities,
    getOpportunityById,
    createOpportunity,
    isAuthenticated: !!user,
  };
};
