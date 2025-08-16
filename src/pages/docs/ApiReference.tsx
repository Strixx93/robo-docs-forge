import { SidebarLayout } from '@/components/ui/sidebar-layout';
import { SectionCard } from '@/components/section-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ApiReference() {
  const sectionData = {
    title: 'Robot Control API',
    type: 'code' as const,
    language: 'python',
    filename: 'robot_control.py',
    content: `import asyncio
from robotics_sdk import RobotController, SensorManager

class RoboticsSystem:
    def __init__(self, robot_id: str):
        """
        Initialize the robotics system with a specific robot ID.
        
        Args:
            robot_id (str): Unique identifier for the robot
        """
        self.controller = RobotController(robot_id)
        self.sensors = SensorManager()
        self.is_initialized = False
        
    async def initialize(self):
        """Initialize robot systems and sensors"""
        try:
            await self.controller.connect()
            await self.sensors.calibrate()
            self.is_initialized = True
            print("Robot system initialized successfully")
        except Exception as e:
            print(f"Initialization failed: {e}")
            raise
        
    async def move_forward(self, distance: float, speed: float = 1.0):
        """
        Move robot forward by specified distance.
        
        Args:
            distance (float): Distance to move in meters
            speed (float): Movement speed (0.1 to 2.0)
        """
        if not self.is_initialized:
            raise RuntimeError("Robot system not initialized")
            
        if not 0.1 <= speed <= 2.0:
            raise ValueError("Speed must be between 0.1 and 2.0")
            
        await self.controller.move({
            'direction': 'forward',
            'distance': distance,
            'speed': speed
        })
        
    async def rotate(self, angle: float, speed: float = 1.0):
        """
        Rotate robot by specified angle.
        
        Args:
            angle (float): Rotation angle in degrees (positive = clockwise)
            speed (float): Rotation speed (0.1 to 2.0)
        """
        if not self.is_initialized:
            raise RuntimeError("Robot system not initialized")
            
        await self.controller.rotate({
            'angle': angle,
            'speed': speed
        })
        
    async def get_sensor_data(self):
        """Get current sensor readings"""
        if not self.is_initialized:
            raise RuntimeError("Robot system not initialized")
            
        return await self.sensors.get_all_readings()
        
    async def emergency_stop(self):
        """Emergency stop all robot operations"""
        await self.controller.emergency_stop()
        print("Emergency stop activated")
        
    async def shutdown(self):
        """Safely shutdown the robot system"""
        await self.controller.disconnect()
        print("Robot system shutdown complete")

# Usage example
async def main():
    robot = RoboticsSystem("robot_001")
    
    try:
        await robot.initialize()
        
        # Move forward 2.5 meters at 80% speed
        await robot.move_forward(2.5, speed=0.8)
        
        # Rotate 90 degrees clockwise
        await robot.rotate(90, speed=0.5)
        
        # Get sensor readings
        sensor_data = await robot.get_sensor_data()
        print(f"Sensor data: {sensor_data}")
        
    except Exception as e:
        print(f"Error: {e}")
        await robot.emergency_stop()
    
    finally:
        await robot.shutdown()

if __name__ == "__main__":
    asyncio.run(main())`,
    updatedAt: '2024-01-14T16:45:00Z',
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
              <span>API Team</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <SectionCard
          title={sectionData.title}
          type={sectionData.type}
          content={sectionData.content}
          language={sectionData.language}
          filename={sectionData.filename}
          updatedAt={sectionData.updatedAt}
          published={sectionData.published}
        />
      </div>
    </SidebarLayout>
  );
}