import React from 'react';
import { Search, Filter, ArrowUpDown, RotateCcw } from 'lucide-react';

const TaskFilterBar = ({ filters, onFilterChange, onReset }) => {
  const handleSearchChange = (e) => {
    onFilterChange('search', e.target.value);
  };

  const handleStatusChange = (e) => {
    onFilterChange('status', e.target.value);
  };

  const handlePriorityChange = (e) => {
    onFilterChange('priority', e.target.value);
  };

  const handleSortByChange = (e) => {
    onFilterChange('sortBy', e.target.value);
  };

  const handleSortOrderChange = () => {
    onFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const hasActiveFilters = filters.status || filters.priority || filters.search;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-3 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4 mb-6 transition-colors duration-200">
      
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={filters.search || ''}
          onChange={handleSearchChange}
          placeholder="Search tasks by title..."
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-colors"
        />
      </div>

      {/* Filters & Sort Controls */}
      <div className="flex flex-wrap items-center gap-2.5">
        
        {/* Status Dropdown */}
        <div className="flex items-center space-x-1">
          <select
            value={filters.status || ''}
            onChange={handleStatusChange}
            className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-sky-500 outline-none"
          >
            <option value="">All Statuses</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Priority Dropdown */}
        <div className="flex items-center space-x-1">
          <select
            value={filters.priority || ''}
            onChange={handlePriorityChange}
            className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-sky-500 outline-none"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center space-x-1">
          <select
            value={filters.sortBy || 'createdAt'}
            onChange={handleSortByChange}
            className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-sky-500 outline-none"
          >
            <option value="createdAt">Sort: Created Date</option>
            <option value="dueDate">Sort: Due Date</option>
            <option value="priority">Sort: Priority</option>
            <option value="title">Sort: Title</option>
          </select>

          {/* Toggle Sort Order */}
          <button
            onClick={handleSortOrderChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={`Sort Order: ${filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
          >
            <ArrowUpDown className={`w-4 h-4 transition-transform ${filters.sortOrder === 'asc' ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Reset Filters */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center space-x-1 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors font-medium"
            title="Reset filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}

      </div>

    </div>
  );
};

export default TaskFilterBar;
