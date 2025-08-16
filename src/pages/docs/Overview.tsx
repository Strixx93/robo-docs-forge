import { SidebarLayout } from '@/components/ui/sidebar-layout';
import { SectionCard } from '@/components/section-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Overview() {
  const sectionData = {
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
4. **Safety Layer**: Ensures all operations meet safety requirements

## Getting Started

To begin working with our robotics platform, you'll need to understand the core concepts and setup procedures outlined in this documentation.

### Prerequisites

Before you start, ensure you have:
- Python 3.8 or higher
- Basic understanding of robotics concepts
- Access to the development environment
- Required hardware components

### Installation

Follow these steps to set up your development environment:

1. Clone the repository
2. Install dependencies
3. Configure your robot connection
4. Run initial calibration tests

## Support

If you encounter any issues or have questions, please refer to our troubleshooting guide or contact the development team.`,
    updatedAt: '2024-01-15T10:30:00Z',
    published: true
  };

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
          <h1 className="text-3xl font-bold text-foreground mb-4">{sectionData.title}</h1>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Updated {new Date(sectionData.updatedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Documentation Team</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <SectionCard
          title={sectionData.title}
          type={sectionData.type}
          content={sectionData.content}
          updatedAt={sectionData.updatedAt}
          published={sectionData.published}
        />
      </div>
    </SidebarLayout>
  );
}