-- Drop and recreate the document_sections table
DROP TABLE IF EXISTS public.document_sections CASCADE;

-- Create a fresh document_sections table
CREATE TABLE public.document_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('text', 'code')),
  content TEXT NOT NULL,
  language TEXT,
  filename TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.document_sections ENABLE ROW LEVEL SECURITY;

-- Create policies for full access (no authentication required for admin panel)
CREATE POLICY "Allow all operations on document_sections" 
ON public.document_sections 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_document_sections_updated_at
  BEFORE UPDATE ON public.document_sections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();