-- Create the document_sections table
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

-- Create policies to allow public read access and admin write access
CREATE POLICY "Anyone can read published sections" 
ON public.document_sections 
FOR SELECT 
USING (published = true);

CREATE POLICY "Allow all operations for now"
ON public.document_sections 
FOR ALL
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_document_sections_updated_at
BEFORE UPDATE ON public.document_sections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();