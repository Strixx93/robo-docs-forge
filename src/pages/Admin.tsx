import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Eye, EyeOff, GripVertical, Loader2 } from 'lucide-react';
import { SidebarLayout } from '@/components/ui/sidebar-layout';
import { useDocumentSections } from '@/hooks/useDocumentSections';
import { type DocumentSection } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

export default function Admin() {
  const { 
    sections, 
    loading, 
    error, 
    createSection, 
    updateSection, 
    deleteSection: deleteSectionFromDB, 
    togglePublished: togglePublishedInDB 
  } = useDocumentSections();
  
  const [editingSection, setEditingSection] = useState<DocumentSection | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const togglePublished = async (id: string) => {
    try {
      await togglePublishedInDB(id);
      toast({
        title: "Success",
        description: "Section publication status updated",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update section",
        variant: "destructive",
      });
    }
  };

  const deleteSection = async (id: string) => {
    try {
      await deleteSectionFromDB(id);
      toast({
        title: "Success",
        description: "Section deleted successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete section",
        variant: "destructive",
      });
    }
  };

  const startEditing = (section: DocumentSection) => {
    setEditingSection(section);
    setIsCreating(false);
  };

  const startCreating = () => {
    setEditingSection({
      id: '',
      title: '',
      type: 'text',
      content: '',
      published: false,
      order: sections.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    setIsCreating(true);
  };

  const saveSection = async () => {
    if (!editingSection) return;

    try {
      setSaving(true);
      
      if (isCreating) {
        const { id, created_at, updated_at, ...sectionData } = editingSection;
        await createSection(sectionData);
        toast({
          title: "Success",
          description: "Section created successfully",
        });
      } else {
        const { created_at, updated_at, ...sectionData } = editingSection;
        await updateSection(editingSection.id, sectionData);
        toast({
          title: "Success",
          description: "Section updated successfully",
        });
      }

      setEditingSection(null);
      setIsCreating(false);
    } catch (err) {
      toast({
        title: "Error",
        description: `Failed to ${isCreating ? 'create' : 'update'} section`,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setIsCreating(false);
  };

  if (loading) {
    return (
      <SidebarLayout>
        <div className="p-8 max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading sections...</span>
          </div>
        </div>
      </SidebarLayout>
    );
  }

  if (error) {
    return (
      <SidebarLayout>
        <div className="p-8 max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-destructive mb-4">Error: {error}</p>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Manage documentation sections and content</p>
          </div>
          <Button onClick={startCreating} className="bg-gradient-primary hover:glow-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Section
          </Button>
        </div>

        {editingSection && (
          <Card className="mb-8 border-primary/20 bg-card">
            <CardHeader>
              <CardTitle className="text-xl">
                {isCreating ? 'Create New Section' : 'Edit Section'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Section title"
                value={editingSection.title}
                onChange={(e) => setEditingSection(prev => 
                  prev ? { ...prev, title: e.target.value } : null
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Select
                  value={editingSection.type}
                  onValueChange={(value: 'text' | 'code') => 
                    setEditingSection(prev => 
                      prev ? { ...prev, type: value } : null
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Section type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text (Markdown)</SelectItem>
                    <SelectItem value="code">Code Block</SelectItem>
                  </SelectContent>
                </Select>

                {editingSection.type === 'code' && (
                  <Input
                    placeholder="Programming language"
                    value={editingSection.language || ''}
                    onChange={(e) => setEditingSection(prev => 
                      prev ? { ...prev, language: e.target.value } : null
                    )}
                  />
                )}
              </div>

              {editingSection.type === 'code' && (
                <Input
                  placeholder="Filename (optional)"
                  value={editingSection.filename || ''}
                  onChange={(e) => setEditingSection(prev => 
                    prev ? { ...prev, filename: e.target.value } : null
                  )}
                />
              )}

              <Textarea
                placeholder={editingSection.type === 'text' 
                  ? "Enter markdown content..." 
                  : "Enter code..."
                }
                value={editingSection.content}
                onChange={(e) => setEditingSection(prev => 
                  prev ? { ...prev, content: e.target.value } : null
                )}
                className="min-h-[200px] font-mono text-sm"
              />

              <div className="flex gap-2">
                <Button 
                  onClick={saveSection} 
                  className="bg-gradient-primary"
                  disabled={saving}
                >
                  {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {isCreating ? 'Create' : 'Save'} Section
                </Button>
                <Button onClick={cancelEditing} variant="outline" disabled={saving}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {sections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <Card key={section.id} className="group hover:shadow-card transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                      <div>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {section.type}
                          </Badge>
                          {section.language && (
                            <Badge variant="secondary" className="text-xs">
                              {section.language}
                            </Badge>
                          )}
                          <Badge variant={section.published ? "default" : "secondary"} className="text-xs">
                            {section.published ? "Published" : "Draft"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePublished(section.id)}
                      >
                        {section.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEditing(section)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteSection(section.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground line-clamp-3">
                    {section.content.substring(0, 200)}...
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Updated {new Date(section.updated_at).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {sections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No documentation sections yet.</p>
            <Button onClick={startCreating} className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Section
            </Button>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}