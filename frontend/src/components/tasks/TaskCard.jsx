import React from 'react';
import { Calendar, CheckCircle2, Clock, Edit2, Trash2, AlertCircle } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onStatusToggle }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Done':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'In Progress':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'Medium':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isOverdue = task.status !== 'Done' && new Date(task.dueDate) < new Date().setHours(0,0,0,0);

  return (
    <div className={`bg-white dark:bg-gray-800 border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between ${
      task.status === 'Done' ? 'opacity-85 border-gray-200 dark:border-gray-700' : 'border-gray-200 dark:border-gray-700'
    }`}>
      
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className={`font-semibold text-lg leading-snug text-gray-900 dark:text-gray-100 ${
            task.status === 'Done' ? 'line-through text-gray-500 dark:text-gray-400' : ''
          }`}>
            {task.title}
          </h3>

          <div className="flex items-center space-x-1.5 shrink-0">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${getStatusBadge(task.status)}`}>
              {task.status}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${getPriorityBadge(task.priority)}`}>
              {task.priority}
            </span>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {task.description}
          </p>
        )}
      </div>

      {/* Footer Info & Actions */}
      <div className="pt-4 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between mt-2">
        {/* Due date */}
        <div className={`flex items-center space-x-1.5 text-xs ${
          isOverdue ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-gray-500 dark:text-gray-400'
        }`}>
          {isOverdue ? <AlertCircle className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
          <span>{formatDate(task.dueDate)}</span>
          {isOverdue && <span className="text-[10px] bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded">Overdue</span>}
        </div>

        {/* Card Actions */}
        <div className="flex items-center space-x-1">
          {/* Quick Mark Done Button */}
          <button
            onClick={() => onStatusToggle(task)}
            className={`p-1.5 rounded-lg transition-colors ${
              task.status === 'Done'
                ? 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                : 'text-gray-400 hover:text-emerald-600 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title={task.status === 'Done' ? 'Mark as In Progress' : 'Mark as Done'}
          >
            <CheckCircle2 className="w-4 h-4" />
          </button>

          {/* Edit */}
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-sky-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Edit Task"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(task._id)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default TaskCard;
