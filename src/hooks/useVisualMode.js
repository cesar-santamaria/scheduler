import { useState } from 'react'

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([])

  // transitions to new state and updates history
  const transition = (newMode, replace = false) => {
    setHistory([...history, mode])
    if (replace) {
      setHistory((prev) => [...prev].splice(prev.length - 2, 1))
    }
    setMode(newMode)
  }

  // back to previous history
  const back = () => {
    setMode(history[history.length - 1] ? history[history.length - 1] : mode)
    setHistory([...history].slice(0, history.length - 1))
  }

  return { mode, transition, back }
}
