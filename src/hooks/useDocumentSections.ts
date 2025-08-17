import { useState, useEffect } from 'react'
import { supabase, type DocumentSection } from '@/lib/supabase'

export function useDocumentSections() {
  const [sections, setSections] = useState<DocumentSection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load sections from Supabase or localStorage fallback
  const loadSections = async () => {
    try {
      setLoading(true)
      
      // Try Supabase first
      try {
        const { data, error } = await supabase
          .from('document_sections')
          .select('*')
          .order('order', { ascending: true })
        
        if (!error && data) {
          setSections(data)
          setLoading(false)
          return
        }
      } catch (supabaseError) {
        // Fall through to localStorage
      }

      // Fallback to localStorage with sample data
        const stored = localStorage.getItem('document_sections')
        if (stored) {
          setSections(JSON.parse(stored))
        } else {
          // Initialize with sample data
          const sampleData = [
            {
              id: '1',
              title: 'Robotics Platform Overview',
              type: 'text' as const,
              content: `# Robotics Platform Overview\n\nWelcome to our comprehensive robotics documentation platform. This system is designed to help teams onboard quickly and efficiently.\n\n## Key Features\n\n- **Real-time Control**: Direct robot control with minimal latency\n- **Advanced Sensors**: Integration with LIDAR, cameras, and IMU sensors\n- **AI Integration**: Built-in machine learning capabilities\n- **Safety Systems**: Comprehensive safety protocols and emergency stops\n\n## Getting Started\n\nTo begin working with our robotics platform, you'll need to understand the core concepts and setup procedures outlined in this documentation.`,
              published: true,
              order: 1,
              created_at: '2024-01-15T10:30:00Z',
              updated_at: '2024-01-15T10:30:00Z'
            },
            {
              id: '2',
              title: 'Robot Control API',
              type: 'code' as const,
              language: 'python',
              filename: 'robot_control.py',
              content: `import asyncio\nfrom robotics_sdk import RobotController, SensorManager\n\nclass RoboticsSystem:\n    def __init__(self, robot_id: str):\n        self.controller = RobotController(robot_id)\n        self.sensors = SensorManager()\n        \n    async def initialize(self):\n        """Initialize robot systems and sensors"""\n        await self.controller.connect()\n        await self.sensors.calibrate()\n        print("Robot system initialized successfully")\n        \n    async def move_forward(self, distance: float, speed: float = 1.0):\n        """Move robot forward by specified distance"""\n        await self.controller.move({\n            'direction': 'forward',\n            'distance': distance,\n            'speed': speed\n        })\n        \n    async def emergency_stop(self):\n        """Emergency stop all robot operations"""\n        await self.controller.emergency_stop()\n        print("Emergency stop activated")\n\n# Usage example\nasync def main():\n    robot = RoboticsSystem("robot_001")\n    await robot.initialize()\n    await robot.move_forward(2.5, speed=0.8)\n\nif __name__ == "__main__":\n    asyncio.run(main())`,
              published: true,
              order: 2,
              created_at: '2024-01-14T16:45:00Z',
              updated_at: '2024-01-14T16:45:00Z'
            }
          ]
          localStorage.setItem('document_sections', JSON.stringify(sampleData))
          setSections(sampleData)
        }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sections')
    } finally {
      setLoading(false)
    }
  }

  // Create new section
  const createSection = async (section: Omit<DocumentSection, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // Try Supabase first
      try {
        const { data, error } = await supabase
          .from('document_sections')
          .insert([section])
          .select()
          .single()

        if (!error && data) {
          setSections(prev => [...prev, data])
          return data
        }
      } catch (supabaseError) {
        // Fall through to localStorage
      }
      
      // Fallback to localStorage
      const newSection = {
        ...section,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      const stored = localStorage.getItem('document_sections')
      const existing = stored ? JSON.parse(stored) : []
      const updated = [...existing, newSection]
      localStorage.setItem('document_sections', JSON.stringify(updated))
      setSections(prev => [...prev, newSection])
      return newSection
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create section')
      throw err
    }
  }

  // Update section
  const updateSection = async (id: string, updates: Partial<DocumentSection>) => {
    try {
      // Try Supabase first
      try {
        const { data, error } = await supabase
          .from('document_sections')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single()

        if (!error && data) {
          setSections(prev => prev.map(section => 
            section.id === id ? data : section
          ))
          return data
        }
      } catch (supabaseError) {
        // Fall through to localStorage
      }
      
      // Fallback to localStorage
      const updatedSection = { ...updates, updated_at: new Date().toISOString() }
      const stored = localStorage.getItem('document_sections')
      const existing = stored ? JSON.parse(stored) : []
      const updated = existing.map((section: DocumentSection) => 
        section.id === id ? { ...section, ...updatedSection } : section
      )
      localStorage.setItem('document_sections', JSON.stringify(updated))
      setSections(prev => prev.map(section => 
        section.id === id ? { ...section, ...updatedSection } : section
      ))
      return updatedSection
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update section')
      throw err
    }
  }

  // Delete section
  const deleteSection = async (id: string) => {
    try {
      // Try Supabase first
      try {
        await supabase
          .from('document_sections')
          .delete()
          .eq('id', id)
      } catch (supabaseError) {
        // Continue with localStorage update
      }

      // Update localStorage
      const stored = localStorage.getItem('document_sections')
      if (stored) {
        const existing = JSON.parse(stored)
        const updated = existing.filter((section: DocumentSection) => section.id !== id)
        localStorage.setItem('document_sections', JSON.stringify(updated))
      }
      
      setSections(prev => prev.filter(section => section.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete section')
      throw err
    }
  }

  // Toggle published status
  const togglePublished = async (id: string) => {
    const section = sections.find(s => s.id === id)
    if (!section) return

    await updateSection(id, { published: !section.published })
  }

  useEffect(() => {
    loadSections()
  }, [])

  return {
    sections,
    loading,
    error,
    createSection,
    updateSection,
    deleteSection,
    togglePublished,
    refreshSections: loadSections
  }
}