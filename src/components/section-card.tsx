import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MarkdownViewer } from '@/components/markdown-viewer';
import { FileText, Code, Clock } from 'lucide-react';

interface SectionCardProps {
  title: string;
  type: 'text' | 'code';
  content: string;
  language?: string;
  filename?: string;
  updatedAt?: string;
  published?: boolean;
}

export function SectionCard({ 
  title, 
  type, 
  content, 
  language, 
  filename, 
  updatedAt, 
  published = true 
}: SectionCardProps) {
  const TypeIcon = type === 'code' ? Code : FileText;

  return (
    <Card className="group bg-card hover:bg-card/80 transition-all duration-300 hover:shadow-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <TypeIcon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {title}
              </CardTitle>
              {filename && (
                <p className="text-sm text-muted-foreground mt-1">{filename}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {type === 'code' && language && (
              <Badge variant="secondary" className="text-xs">
                {language}
              </Badge>
            )}
            <Badge variant={published ? "default" : "secondary"} className="text-xs">
              {published ? "Published" : "Draft"}
            </Badge>
          </div>
        </div>
        {updatedAt && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
            <Clock className="w-3 h-3" />
            <span>Updated {new Date(updatedAt).toLocaleDateString()}</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {type === 'text' ? (
          <MarkdownViewer content={content} />
        ) : (
          <div className="bg-[hsl(var(--code-bg))] border border-[hsl(var(--code-border))] rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-foreground font-mono">
              <code>{content}</code>
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}