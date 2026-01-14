'use client'

import { useDarkMode } from '@/contexts/DarkModeContext'
import { useNotifications } from '@/contexts/NotificationContext'

export default function NotificationHeader() {
  const { isDarkMode } = useDarkMode()
  const { unreadCount, markAllAsRead } = useNotifications()

  return (
    <div className="flex flex-col gap-3 sm:gap-4 mt-12 md:mt-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3 md:mb-4">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1 px-4 md:px-0">
            <h1 className={`text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] font-semibold leading-[1.3] tracking-tight mt-3 transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`} style={{ fontFamily: 'Libre Baskerville, serif' }}>
              Notifications
            </h1>
            {unreadCount > 0 && (
              <div className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${
                isDarkMode 
                  ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50' 
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                {unreadCount} new
              </div>
            )}
          </div>
          <p className={`text-xs sm:text-sm transition-colors duration-200 px-4 md:px-0 ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            Stay updated with important alerts and system notifications
          </p>
        </div>
        
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className={`px-3 py-2 rounded-lg text-xs font-medium duration-200 border flex items-center justify-center ${
              isDarkMode
                ? 'bg-zinc-900/50 border-zinc-700/50 text-zinc-300 hover:bg-zinc-800/70 hover:border-zinc-600/70'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <i className="ph ph-checks mr-1.5 text-xs" />
            Mark all read
          </button>
        )}
      </div>
    </div>
  )
}