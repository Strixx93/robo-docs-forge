import { useParams, Link } from 'react-router-dom';
import { SidebarLayout } from '@/components/ui/sidebar-layout';
import { SectionCard } from '@/components/section-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { useDocumentSections } from '@/hooks/useDocumentSections';

export default function DocumentationPage() {
  const { id } = useParams<{ id: string }>();
  const { sections, loading, error } = useDocumentSections();
  
  const section = sections.find(s => s.id === id);

  if (loading) {
    return (
      <SidebarLayout>
        <div className="p-8 max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading documentation...</p>
          </div>
        </div>
      </SidebarLayout>
    );
  }

  if (error) {
    return (
      <SidebarLayout>
        <div className="p-8 max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-destructive mb-4">Error: {error}</p>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </SidebarLayout>
    );
  }

  if (!section) {
    return (
      <SidebarLayout>
        <div className="p-8 max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">Documentation Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The requested documentation section could not be found.
            </p>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </SidebarLayout>
    );
  }

  if (!section.published) {
    return (
      <SidebarLayout>
        <div className="p-8 max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">Documentation Not Available</h1>
            <p className="text-muted-foreground mb-6">
              This documentation section is not published yet.
            </p>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">{section.title}</h1>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Updated {new Date(section.updated_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Documentation Team</span>
            </div>
            {section.language && (
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                  {section.language}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <SectionCard
          title={section.title}
          type={section.type}
          content={section.content}
          language={section.language}
          filename={section.filename}
          updatedAt={section.updated_at}
          published={section.published}
        />
      </div>
    </SidebarLayout>
  );
}