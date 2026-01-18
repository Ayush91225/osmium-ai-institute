'use client'

import { useStudents } from '@/contexts/StudentContext'
import DashboardLayout from '@/components/dashboard/shared/DashboardLayout'
import StudentHeader from './StudentHeader'
import StudentStats from './StudentStats'
import StudentFilters from './StudentFilters'
import StudentGrid from './StudentGrid'
import StudentTable from './StudentTable'
import Pagination from './Pagination'
import AddStudentModal from './AddStudentModal'

interface StudentManagementProps {
  userType?: 'admin' | 'teacher'
}

export default function StudentManagement({ userType = 'admin' }: StudentManagementProps) {
  const { 
    viewMode, 
    paginatedStudents, 
    totalPages, 
    currentPage,
    isAddModalOpen,
    closeAllModals,
    addStudent,
    setCurrentPage,
    filteredStudents,
    itemsPerPage,
    nextPage,
    prevPage
  } = useStudents()

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <StudentHeader />
        <StudentStats />
        <StudentFilters />
        
        <div className="min-h-[400px]">
          {viewMode === 'grid' ? (
            <StudentGrid students={paginatedStudents} />
          ) : (
            <StudentTable students={paginatedStudents} />
          )}
        </div>
        
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredStudents.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onPrevious={prevPage}
            onNext={nextPage}
          />
        )}
      </div>

      {isAddModalOpen && (
        <AddStudentModal 
          isOpen={isAddModalOpen}
          onClose={closeAllModals}
          onAddStudent={addStudent}
        />
      )}
    </DashboardLayout>
  )
}