
-- Create opportunities table with all required fields
CREATE TABLE public.opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT NOT NULL,
  duration TEXT NOT NULL,
  deadline TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  requirements TEXT[],
  benefits TEXT[],
  application_process TEXT,
  company_info TEXT,
  apply_url TEXT,
  tags TEXT[],
  created_by UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to view opportunities (public)
CREATE POLICY "Everyone can view opportunities" 
  ON public.opportunities 
  FOR SELECT 
  USING (true);

-- Create policy that allows authenticated users to create opportunities
CREATE POLICY "Authenticated users can create opportunities" 
  ON public.opportunities 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

-- Create policy that allows users to update their own opportunities
CREATE POLICY "Users can update their own opportunities" 
  ON public.opportunities 
  FOR UPDATE 
  USING (auth.uid() = created_by);

-- Create policy that allows users to delete their own opportunities
CREATE POLICY "Users can delete their own opportunities" 
  ON public.opportunities 
  FOR DELETE 
  USING (auth.uid() = created_by);

-- Create trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_opportunities_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER opportunities_updated_at
  BEFORE UPDATE ON public.opportunities
  FOR EACH ROW
  EXECUTE FUNCTION update_opportunities_updated_at();
