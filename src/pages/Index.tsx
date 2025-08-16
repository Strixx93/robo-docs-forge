import { SectionCard } from '@/components/section-card';
import { SidebarLayout } from '@/components/ui/sidebar-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, BookOpen, Code, Shield, ArrowRight } from 'lucide-react';

// Sample documentation sections
const sampleSections = [
  {
    title: 'Robotics Platform Overview',
    type: 'text' as const,
    content: `# Welcome to RoboDocs

Our comprehensive robotics documentation platform is designed to accelerate your team's onboarding and development process.

## Key Features

- **Real-time Control**: Direct robot control with minimal latency
- **Advanced Sensors**: Integration with LIDAR, cameras, and IMU sensors  
- **AI Integration**: Built-in machine learning capabilities
- **Safety Systems**: Comprehensive safety protocols and emergency stops

## Architecture

The platform follows a modular architecture that allows for easy integration and scalability:

1. **Control Layer**: Handles real-time robot commands and feedback
2. **Sensor Layer**: Manages all sensor data acquisition and processing
3. **AI Layer**: Provides intelligent decision-making capabilities
4. **Safety Layer**: Ensures all operations meet safety requirements`,
    updatedAt: '2024-01-15T10:30:00Z',
    published: true
  },
  {
    title: 'Robot Control API',
    type: 'code' as const,
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
    updatedAt: '2024-01-14T16:45:00Z',
    published: true
  }
];

const Index = () => {
  return (
    <SidebarLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary mx-auto mb-6 animate-glow">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4 bg-gradient-primary bg-clip-text text-transparent">
            RoboDocs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Comprehensive technical documentation for robotics onboarding and development. 
            Get your team up to speed with our interactive guides and code examples.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button className="bg-gradient-primary hover:glow-primary">
              <BookOpen className="w-4 h-4 mr-2" />
              Start Learning
            </Button>
            <Button variant="outline" className="hover:bg-primary/10 hover:border-primary">
              View Documentation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-subtle border-border/50 hover:shadow-card transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Comprehensive Guides</CardTitle>
                  <p className="text-sm text-muted-foreground">Step-by-step documentation</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-subtle border-border/50 hover:shadow-card transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <Code className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Code Examples</CardTitle>
                  <p className="text-sm text-muted-foreground">Ready-to-use implementations</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-subtle border-border/50 hover:shadow-card transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Safety Protocols</CardTitle>
                  <p className="text-sm text-muted-foreground">Best practices and standards</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Documentation Sections */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Documentation Sections</h2>
          <div className="grid gap-6">
            {sampleSections.map((section, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <SectionCard
                  title={section.title}
                  type={section.type}
                  content={section.content}
                  language={section.language}
                  filename={section.filename}
                  updatedAt={section.updatedAt}
                  published={section.published}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-hero border-primary/20 text-center">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start Building?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Access the admin panel to create and manage your documentation sections. 
              Build comprehensive guides that will help your team succeed.
            </p>
            <Button className="bg-gradient-primary hover:glow-primary">
              <Shield className="w-4 h-4 mr-2" />
              Access Admin Panel
            </Button>
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
};

export default Index;
