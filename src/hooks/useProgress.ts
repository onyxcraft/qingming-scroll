import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'qingming-explored-v1'

interface UseProgressResult {
  exploredIds: number[]
  markExplored: (id: number) => void
  reset: () => void
}

export function useProgress(): UseProgressResult {
  const [exploredIds, setExploredIds] = useState<number[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: unknown = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.every((v) => typeof v === 'number')) {
          setExploredIds(parsed as number[])
        }
      }
    } catch {
      // ignore corrupted storage
    }
  }, [])

  const markExplored = useCallback((id: number) => {
    setExploredIds((prev) => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignore quota errors
      }
      return next
    })
  }, [])

  const reset = useCallback(() => {
    setExploredIds([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  return { exploredIds, markExplored, reset }
}
