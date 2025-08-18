import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export type DocumentSection = {
  id: string
  title: string
  type: 'text' | 'code'
  content: string
  language?: string | null
  filename?: string | null
  published: boolean
  order: number
  created_at: string
  updated_at: string
}

export function useDocumentSections() {
  const [sections, setSections] = useState<DocumentSection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load sections from Supabase
  const loadSections = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('document_sections')
        .select('*')
        .order('order', { ascending: true })
      
      if (error) throw error
      
      setSections((data as DocumentSection[]) || [])
    } catch (err) {
      console.error('Error loading sections:', err)
      setError(err instanceof Error ? err.message : 'Failed to load sections')
    } finally {
      setLoading(false)
    }
  }

  // Create new section
  const createSection = async (section: Omit<DocumentSection, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('document_sections')
        .insert([section])
        .select()
        .single()

      if (error) throw error
      
      if (data) {
        setSections(prev => [...prev, data as DocumentSection].sort((a, b) => a.order - b.order))
        return data as DocumentSection
      }
    } catch (err) {
      console.error('Error creating section:', err)
      setError(err instanceof Error ? err.message : 'Failed to create section')
      throw err
    }
  }

  // Update section
  const updateSection = async (id: string, updates: Partial<DocumentSection>) => {
    try {
      const { data, error } = await supabase
        .from('document_sections')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      
      if (data) {
        setSections(prev => prev.map(section => 
          section.id === id ? data as DocumentSection : section
        ).sort((a, b) => a.order - b.order))
        return data as DocumentSection
      }
    } catch (err) {
      console.error('Error updating section:', err)
      setError(err instanceof Error ? err.message : 'Failed to update section')
      throw err
    }
  }

  // Delete section
  const deleteSection = async (id: string) => {
    try {
      const { error } = await supabase
        .from('document_sections')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      setSections(prev => prev.filter(section => section.id !== id))
    } catch (err) {
      console.error('Error deleting section:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete section')
      throw err
    }
  }

  // Toggle published status
  const togglePublished = async (id: string) => {
    const section = sections.find(s => s.id === id)
    if (!section) {
      throw new Error('Section not found')
    }

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