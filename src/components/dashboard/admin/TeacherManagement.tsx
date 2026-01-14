'use client'

import { memo, useState } from 'react'
import { useTeachers } from '@/contexts/TeacherContext'
import { useDarkMode } from '@/contexts/DarkModeContext'
import TeacherHeader from './TeacherHeader'
import TeacherStats from './TeacherStats'
import TeacherFilters from './TeacherFilters'
import TeacherGrid from './TeacherGrid'
import TeacherTable from './TeacherTable'
import TeacherDetailModal from './TeacherDetailModal'
import AddFacultyModal from './AddFacultyModal'
import DeleteConfirmModal from './DeleteConfirmModal'
import Pagination from './Pagination'

function TeacherManagement() {
  const { isDarkMode } = useDarkMode()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [teacherToDelete, setTeacherToDelete] = useState<any>(null)
  const {
    // State
    paginatedTeachers,
    totalPages,
    currentPage,
    itemsPerPage,
    departments,
    stats,
    searchTerm,
    selectedDepartment,
    selectedExperience,
    viewMode,
    selectedTeacher,
    isDetailModalOpen,
    isAddModalOpen,
    
    // Actions
    setSearchTerm,
    setSelectedDepartment,
    setSelectedExperience,
    setViewMode,
    openTeacherDetail,
    closeAllModals,
    deleteTeacher,
    setCurrentPage,
    nextPage,
    prevPage,
    setIsAddModalOpen,
    addTeacher
  } = useTeachers()

  // Handlers
  const handleAddTeacher = () => {
    setIsAddModalOpen(true)
  }

  const handleBulkImport = () => {
    console.log('Bulk import')
  }

  const handleExport = () => {
    console.log('Export data')
  }

  const handleEditTeacher = (teacher: any) => {
    console.log('Edit teacher:', teacher.id)
  }

  const handleDeleteTeacher = (teacher: any) => {
    setTeacherToDelete(teacher)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (teacherToDelete) {
      deleteTeacher(teacherToDelete.id)
      setTeacherToDelete(null)
    }
  }

  const handleAssignClasses = (teacher: any) => {
    console.log('Assign classes to:', teacher.id)
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <TeacherHeader
        onAddTeacher={handleAddTeacher}
        onBulkImport={handleBulkImport}
        totalTeachers={stats.total}
        activeTeachers={stats.active}
      />

      {/* Stats */}
      <TeacherStats stats={stats} />

      {/* Filters */}
      <TeacherFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        selectedExperience={selectedExperience}
        onExperienceChange={setSelectedExperience}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        departments={departments}
        onExport={handleExport}
      />

      {/* Teachers List */}
      {viewMode === 'grid' ? (
        <TeacherGrid
          teachers={paginatedTeachers}
          onTeacherSelect={openTeacherDetail}
          onEditTeacher={handleEditTeacher}
          onDeleteTeacher={handleDeleteTeacher}
        />
      ) : (
        <TeacherTable
          teachers={paginatedTeachers}
          onTeacherSelect={openTeacherDetail}
          onEditTeacher={handleEditTeacher}
          onDeleteTeacher={handleDeleteTeacher}
        />
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={stats.total}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onPrevious={prevPage}
        onNext={nextPage}
      />

      {/* Empty State */}
      {paginatedTeachers.length === 0 && (
        <div className="text-center py-16">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
            isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'
          }`}>
            <i className={`ph ph-users text-2xl ${
              isDarkMode ? 'text-zinc-400' : 'text-gray-400'
            }`} />
          </div>
          <h3 className={`text-lg font-semibold mb-2 ${
            isDarkMode ? 'text-zinc-100' : 'text-gray-900'
          }`}>
            No faculty members found
          </h3>
          <p className={`mb-6 max-w-sm mx-auto ${
            isDarkMode ? 'text-zinc-400' : 'text-gray-500'
          }`}>
            {searchTerm || selectedDepartment || selectedExperience
              ? 'Try adjusting your search criteria or filters'
              : 'Get started by adding your first faculty member'
            }
          </p>
          {!searchTerm && !selectedDepartment && !selectedExperience && (
            <button
              onClick={handleAddTeacher}
              className="px-6 py-3 bg-[#8C7B65] hover:bg-[#7A6B58] text-white rounded-xl font-medium  duration-200 shadow-sm hover:shadow-md"
            >
              <i className="ph ph-plus mr-2" />
              Add Faculty Member
            </button>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setTeacherToDelete(null)
        }}
        onConfirm={confirmDelete}
        teacherName={teacherToDelete?.name || ''}
      />

      {/* Add Faculty Modal */}
      <AddFacultyModal
        isOpen={isAddModalOpen}
        onClose={closeAllModals}
        onAddTeacher={addTeacher}
      />

      {/* Teacher Detail Modal */}
      <TeacherDetailModal
        teacher={selectedTeacher}
        isOpen={isDetailModalOpen}
        onClose={closeAllModals}
        onEdit={handleEditTeacher}
        onAssignClasses={handleAssignClasses}
      />
    </div>
  )
}

export default memo(TeacherManagement)