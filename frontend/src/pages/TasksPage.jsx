import React, { useState, useEffect, useCallback } from 'react';
import { getTasksApi, createTaskApi, updateTaskApi, deleteTaskApi } from '../api/taskApi';
import TaskCard from '../components/tasks/TaskCard';
import TaskFilterBar from '../components/tasks/TaskFilterBar';
import TaskFormModal from '../components/tasks/TaskFormModal';
import Pagination from '../components/tasks/Pagination';
import Loader from '../components/common/Loader';
import { Plus, ListTodo, AlertCircle } from 'lucide-react';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);

  // Filter & Search state
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTasksApi({
        page: currentPage,
        limit: 6,
        status: filters.status || undefined,
        priority: filters.priority || undefined,
        search: filters.search || undefined,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder
      });

      setTasks(data.tasks || []);
      setTotalPages(data.totalPages || 1);
      setTotalTasks(data.totalTasks || 0);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const handleResetFilters = () => {
    setFilters({
      status: '',
      priority: '',
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    setCurrentPage(1);
  };

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (formData) => {
    setModalLoading(true);
    try {
      if (editingTask) {
        await updateTaskApi(editingTask._id, formData);
      } else {
        await createTaskApi(formData);
      }
      setIsModalOpen(false);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save task');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await deleteTaskApi(taskId);
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleStatusToggle = async (task) => {
    const nextStatus = task.status === 'Done' ? 'In Progress' : 'Done';
    try {
      await updateTaskApi(task._id, { status: nextStatus });
      fetchTasks();
    } catch (err) {
      console.error('Failed to toggle task status', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Page Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <ListTodo className="w-8 h-8 text-sky-600 dark:text-sky-400" />
            <span>Task Management</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Organize, filter, track progress, and complete your tasks
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-xl shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>New Task</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <TaskFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl flex items-center space-x-3 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Tasks Grid or Loading/Empty State */}
      {loading ? (
        <div className="py-16">
          <Loader message="Fetching your tasks..." />
        </div>
      ) : tasks.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-12 text-center my-6 shadow-sm">
          <div className="w-16 h-16 bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <ListTodo className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">No tasks found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
            {filters.search || filters.status || filters.priority
              ? 'No tasks match your current filters. Try clearing or adjusting search term.'
              : "You haven't created any tasks yet. Click 'New Task' to get started!"}
          </p>
          {(filters.search || filters.status || filters.priority) && (
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteTask}
                onStatusToggle={handleStatusToggle}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalTasks={totalTasks}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />
        </>
      )}

      {/* Create / Edit Modal */}
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveTask}
        initialTask={editingTask}
        loading={modalLoading}
      />

    </div>
  );
};

export default TasksPage;
