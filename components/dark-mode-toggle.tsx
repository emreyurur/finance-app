'use client'
import useDarkMode from '@/hooks/use-dark-mode'
import Button from './button'
import {Moon, Sun} from 'lucide-react'

export default function DarkModeToggle({defaultMode = 'dark'}: {defaultMode?: string}) {
  const {theme, toggleTheme} = useDarkMode(defaultMode)
  return <Button variant="ghost" size="sm" onClick={toggleTheme}>
    {theme === 'light' && <Moon className="w-6 h-6" />}
    {theme === 'dark' && <Sun className="w-6 h-6" />}
  </Button>
}