// This script will add dark mode support to all teacher components

const fs = require('fs');
const path = require('path');

const teacherComponentsPath = 'c:\\Users\\dhrav\\Desktop\\oswebapp\\osmium-ai-institute\\src\\components\\dashboard\\teacher';

// Common dark mode imports and setup
const darkModeImports = `import { useDarkMode } from '@/contexts/DarkModeContext'`;
const darkModeSetup = `
  const [mounted, setMounted] = useState(false)
  const { isDarkMode } = useDarkMode()

  useEffect(() => {
    setMounted(true)
  }, [])`;

// Common dark mode classes
const darkModeClasses = {
  background: `mounted && isDarkMode ? 'bg-zinc-800' : 'bg-white'`,
  backgroundAlt: `mounted && isDarkMode ? 'bg-zinc-900' : 'bg-[#faf8f6]'`,
  text: `mounted && isDarkMode ? 'text-zinc-100' : 'text-gray-900'`,
  textSecondary: `mounted && isDarkMode ? 'text-zinc-400' : 'text-gray-600'`,
  border: `mounted && isDarkMode ? 'border-zinc-700' : 'border-gray-200'`,
  button: `mounted && isDarkMode ? 'bg-zinc-700 border-zinc-600 text-zinc-200 hover:bg-zinc-600' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'`
};

console.log('Dark mode classes ready for manual application to teacher components');