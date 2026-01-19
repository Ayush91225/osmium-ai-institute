'use client'

import { useDarkMode } from '@/contexts/DarkModeContext'
import BlurredImage from '@/components/BlurredImage'

interface ScheduledTestCardProps {
  test: {
    id: string
    name: string
    subject: string
    date: string
    duration: string
    teacher: string
  }
}

export default function ScheduledTestCard({ test }: ScheduledTestCardProps) {
  const { isDarkMode } = useDarkMode()

  return (
    <div className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
      isDarkMode 
        ? 'bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/70' 
        : 'bg-white/50 border-gray-200/50 hover:border-gray-300/70'
    }`}>
      <div className={`w-full h-40 relative overflow-hidden rounded-t-2xl border-b ${
        isDarkMode ? 'bg-zinc-900/50 border-zinc-800/30' : 'bg-gray-50/50 border-gray-200/30'
      }`}>
        <BlurredImage className="w-full h-full object-cover" />
      </div>

      <div className="p-4">
        <div className="mb-4">
          <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {test.name}
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            {test.subject}
          </p>
        </div>

        <div className={`grid grid-cols-2 gap-px rounded-xl overflow-hidden mb-4 ${
          isDarkMode ? 'bg-zinc-800/30' : 'bg-gray-200/30'
        }`}>
          <div className={`p-3 flex items-start gap-2 ${isDarkMode ? 'bg-zinc-900/60' : 'bg-white/60'}`}>
            <i className={`ph ph-calendar text-sm flex-shrink-0 ${isDarkMode ? 'text-zinc-600' : 'text-gray-500'}`} />
            <div>
              <p className={`text-xs mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Scheduled on:</p>
              <p className={`text-sm font-light ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {new Date(test.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className={`p-3 flex items-start gap-2 ${isDarkMode ? 'bg-zinc-900/60 border-l border-zinc-800/30' : 'bg-white/60 border-l border-gray-200/30'}`}>
            <i className={`ph ph-clock text-sm flex-shrink-0 ${isDarkMode ? 'text-zinc-600' : 'text-gray-500'}`} />
            <div>
              <p className={`text-xs mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Duration:</p>
              <p className={`text-sm font-light ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{test.duration}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <img 
            src={`https://api.dicebear.com/9.x/glass/svg?seed=${test.teacher.toLowerCase().replace(' ', '-')}&backgroundColor=4747eb,4762eb,477eeb,4799eb,47b4eb,47d0eb,47eb47,47eb62,47eb7e,47eb99,47ebb4,47ebd0,47ebeb,6247eb,62eb47,7e47eb,7eeb47,9947eb,99eb47,b447eb,b4eb47,d047eb,d0eb47,eb4747,eb4762,eb477e,eb4799,eb47d0,eb47eb,eb6247,eb7e47,eb9947,ebb447,ebd047,ebeb47,ffd5dc,ffdfbf,b6e3f4,c0aede,d1d4f9&backgroundType=gradientLinear&backgroundRotation=0,360,10,20,30`}
            alt={test.teacher}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className={`text-xs mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Scheduled by:</p>
            <p className={`text-sm font-light ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{test.teacher}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
