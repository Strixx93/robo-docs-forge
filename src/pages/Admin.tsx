import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';
import { SidebarLayout } from '@/components/ui/sidebar-layout';

interface DocumentSection {
  id: string;
  title: string;
  type: 'text' | 'code';
  content: string;
  language?: string;
  filename?: string;
  published: boolean;
  order: number;
  updatedAt: string;
}

// Sample data
const sampleSections: DocumentSection[] = [
  {
    id: '1',
    title: 'Robotics Platform Overview',
    type: 'text',
    content: `# Robotics Platform Overview

Welcome to our comprehensive robotics documentation platform. This system is designed to help teams onboard quickly and efficiently.

## Key Features

- **Real-time Control**: Direct robot control with minimal latency
- **Advanced Sensors**: Integration with LIDAR, cameras, and IMU sensors
- **AI Integration**: Built-in machine learning capabilities
- **Safety Systems**: Comprehensive safety protocols and emergency stops

## Getting Started

To begin working with our robotics platform, you'll need to understand the core concepts and setup procedures outlined in this documentation.`,
    published: true,
    order: 1,
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Robot Control API',
    type: 'code',
    language: 'python',
    filename: 'robot_control.py',
    content: `import asyncio
from robotics_sdk import RobotController, SensorManager

class RoboticsSystem:
    def __init__(self, robot_id: str):
        self.controller = RobotController(robot_id)
        self.sensors = SensorManager()
        
    async def initialize(self):
        """Initialize robot systems and sensors"""
        await self.controller.connect()
        await self.sensors.calibrate()
        print("Robot system initialized successfully")
        
    async def move_forward(self, distance: float, speed: float = 1.0):
        """Move robot forward by specified distance"""
        await self.controller.move({
            'direction': 'forward',
            'distance': distance,
            'speed': speed
        })
        
    async def emergency_stop(self):
        """Emergency stop all robot operations"""
        await self.controller.emergency_stop()
        print("Emergency stop activated")

# Usage example
async def main():
    robot = RoboticsSystem("robot_001")
    await robot.initialize()
    await robot.move_forward(2.5, speed=0.8)

if __name__ == "__main__":
    asyncio.run(main())`,
    published: true,
    order: 2,
    updatedAt: '2024-01-14T16:45:00Z'
  },
  {
    id: '3',
    title: 'Safety Protocols',
    type: 'text',
    content: `# Safety Protocols

Safety is our top priority when working with robotic systems. Please follow these protocols at all times.

## Emergency Procedures

1. **Emergency Stop**: Always keep the emergency stop button within reach
2. **Safe Zones**: Maintain designated safe zones around active robots
3. **Personal Protective Equipment**: Wear required safety gear

## Pre-Operation Checklist

- [ ] Verify emergency stop functionality
- [ ] Check sensor calibration
- [ ] Confirm communication links
- [ ] Review planned operation area`,
    published: false,
    order: 3,
    updatedAt: '2024-01-13T09:15:00Z'
  }
];

export default function Admin() {
  const [sections, setSections] = useState<DocumentSection[]>(sampleSections);
  const [editingSection, setEditingSection] = useState<DocumentSection | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const togglePublished = (id: string) => {
    setSections(prev => prev.map(section => 
      section.id === id 
        ? { ...section, published: !section.published }
        : section
    ));
  };

  const deleteSection = (id: string) => {
    setSections(prev => prev.filter(section => section.id !== id));
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
      updatedAt: new Date().toISOString()
    });
    setIsCreating(true);
  };

  const saveSection = () => {
    if (!editingSection) return;

    if (isCreating) {
      const newSection = {
        ...editingSection,
        id: Date.now().toString(),
        updatedAt: new Date().toISOString()
      };
      setSections(prev => [...prev, newSection]);
    } else {
      setSections(prev => prev.map(section => 
        section.id === editingSection.id 
          ? { ...editingSection, updatedAt: new Date().toISOString() }
          : section
      ));
    }

    setEditingSection(null);
    setIsCreating(false);
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setIsCreating(false);
  };

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
                <Button onClick={saveSection} className="bg-gradient-primary">
                  {isCreating ? 'Create' : 'Save'} Section
                </Button>
                <Button onClick={cancelEditing} variant="outline">
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
                    Updated {new Date(section.updatedAt).toLocaleDateString()}
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