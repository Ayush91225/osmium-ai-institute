import { memo } from 'react'

function LoadingCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
          <div className="h-3 bg-gray-200 rounded w-4/6" />
        </div>
      </div>
    </div>
  )
}

export default memo(LoadingCard)