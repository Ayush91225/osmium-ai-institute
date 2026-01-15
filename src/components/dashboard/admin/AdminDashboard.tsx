'use client'

import { memo } from 'react'
import { useStudents } from '@/contexts/StudentContext'
import { useTeachers } from '@/contexts/TeacherContext'
import { useClasses } from '@/contexts/ClassContext'
import DashboardHeader from './DashboardHeader'
import StatsSection from './StatsSection'
import DashboardGrid from './DashboardGrid'

function AdminDashboard() {
  const { stats: studentStats } = useStudents()
  const { stats: teacherStats } = useTeachers()
  const { stats: classStats, subjects } = useClasses()
  
  // Calculate total assigned subjects across all classes
  const totalAssignedSubjects = subjects.length
  
  return (
    <div className="space-y-6 md:space-y-8">
      <DashboardHeader />
      <div className="stats">
        <div className="stat-item">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
              <circle cx="128" cy="128" r="120" fill="#ECE1D1"></circle>
              <polyline points="48 128 72 128 96 64 160 192 184 128 208 128" fill="none" stroke="#8B7355" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"></polyline>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-title">Total Students</div>
            <div className="stat-value">{studentStats.total}</div>
            <span className="stat-extra stat-extra-green">{studentStats.active} active • {studentStats.classes} classes</span>
          </div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
              <circle cx="128" cy="128" r="120" fill="#E8E7D5"></circle>
              <g transform="translate(128,128) scale(0.7) translate(-128,-128)"><path d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.08,16.08,0,0,0-6.35-12.76L141.27,128l52.38-39.6A16.05,16.05,0,0,0,200,75.64ZM178.23,176H77.33L128,138ZM72,216V192H184v24ZM184,75.64,128,118,72,76V40H184Z" fill="#434027"></path></g>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-title">Total Teachers</div>
            <div className="stat-value">{teacherStats.total}</div>
            <span className="stat-extra stat-extra-green">{teacherStats.active} active • {teacherStats.departments} depts</span>
          </div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
              <circle cx="128" cy="128" r="120" fill="#CFE8E2"></circle>
              <g transform="translate(128,128) scale(0.7) translate(-128,-128)"><path d="M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z" fill="#242929"></path></g>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-title">Total Classes</div>
            <div className="stat-value">{classStats.total}</div>
            <span className="stat-extra stat-extra-green">{classStats.active} active • {classStats.branches} locations</span>
          </div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
              <circle cx="128" cy="128" r="120" fill="#F4ECE6"></circle>
              <g transform="translate(128,128) scale(0.7) translate(-128,-128)"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM48,48H208V88H48ZM48,208V104H208V208Z" fill="#89694A"></path></g>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-title">Total Subjects</div>
            <div className="stat-value">{totalAssignedSubjects}</div>
            <span className="stat-extra stat-extra-green">{classStats.courses} programs</span>
          </div>
        </div>
      </div>
      <DashboardGrid />
    </div>
  )
}

export default memo(AdminDashboard)