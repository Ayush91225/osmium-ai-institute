'use client'

import { useClasses } from '@/contexts/ClassContext'
import { useUnifiedData } from '@/contexts/UnifiedDataContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import ClassHeader from './ClassHeader'
import ClassStats from './ClassStats'
import ClassFilters from './ClassFilters'
import ClassGrid from './ClassGrid'
import ClassTable from './ClassTable'
import AddBranchModal from './AddBranchModal'
import AddCourseModal from './AddCourseModal'
import AddClassModal from './AddClassModal'
import DeleteConfirmModal from './DeleteConfirmModal'
import Pagination from './Pagination'
import { useState } from 'react'

export default function ClassManagement() {
  const {
    viewMode,
    paginatedClasses,
    totalPages,
    currentPage,
    isBranchModalOpen,
    isCourseModalOpen,
    isClassModalOpen,
    isDeleteModalOpen,
    closeAllModals,
    addBranch,
    addCourse,
    addClass,
    deleteClass,
    setCurrentPage,
    filteredClasses,
    itemsPerPage,
    classToDelete
  } = useClasses()
  
  const { syncClassDeletion } = useUnifiedData()
  
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null)

  const handleAddBranch = (branch: any) => {
    addBranch(branch)
    setNotification({ type: 'success', message: `Location "${branch.name}" created successfully!` })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleAddCourse = (course: any) => {
    addCourse(course)
    setNotification({ type: 'success', message: `Program "${course.name}" created successfully!` })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleAddClass = (cls: any) => {
    addClass(cls)
    setNotification({ type: 'success', message: `Class "${cls.name}" created successfully!` })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleDeleteClass = () => {
    if (classToDelete) {
      const className = classToDelete.name
      syncClassDeletion(classToDelete.id) // Cascade delete to students/teachers
      deleteClass(classToDelete.id)
      setNotification({ type: 'success', message: `Class "${className}" and all references deleted successfully!` })
      setTimeout(() => setNotification(null), 3000)
    }
    closeAllModals()
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {notification && (
          <div className={`fixed top-4 right-4 z-[10000] px-4 py-3 rounded-xl shadow-lg border backdrop-blur-xl animate-slide-in ${
            notification.type === 'success' 
              ? 'bg-green-500/90 border-green-400/50 text-white' 
              : 'bg-red-500/90 border-red-400/50 text-white'
          }`}>
            <div className="flex items-center gap-2">
              <i className={`ph ph-${notification.type === 'success' ? 'check-circle' : 'warning-circle'} text-lg`} />
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
          </div>
        )}
        
        <ClassHeader />
        <ClassStats />
        <ClassFilters />
        
        <div className="min-h-[400px]">
          {viewMode === 'grid' ? (
            <ClassGrid classes={paginatedClasses} />
          ) : (
            <ClassTable classes={paginatedClasses} />
          )}
        </div>
        
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredClasses.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onPrevious={() => setCurrentPage(Math.max(1, currentPage - 1))}
            onNext={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          />
        )}
      </div>

      <AddBranchModal 
        isOpen={isBranchModalOpen}
        onClose={closeAllModals}
        onAddBranch={handleAddBranch}
      />

      <AddCourseModal 
        isOpen={isCourseModalOpen}
        onClose={closeAllModals}
        onAddCourse={handleAddCourse}
      />

      <AddClassModal 
        isOpen={isClassModalOpen}
        onClose={closeAllModals}
        onAddClass={handleAddClass}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={closeAllModals}
        onConfirm={handleDeleteClass}
        teacherName={classToDelete?.name || ''}
        type="class"
      />
    </DashboardLayout>
  )
}
